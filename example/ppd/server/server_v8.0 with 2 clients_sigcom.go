package main

import (
	"crypto/md5"
	"errors"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"math"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
	"path"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"sync"

	//"mime"
	"bufio"

	_ "net/http/pprof"

	// "github.com/gonum/plot/plotter"
	"github.com/lucas-clemente/quic-go/h2quic"
	"github.com/lucas-clemente/quic-go/internal/utils"

	//"github.com/mxk/go-flowrate/flowrate"
	// "github.com/gonum/plot"
	// "github.com/gonum/plot/plotutil"
	// "github.com/gonum/plot/vg"
	"github.com/juju/ratelimit"
	"gonum.org/v1/plot"
	"gonum.org/v1/plot/plotter"
	"gonum.org/v1/plot/plotutil"
	"gonum.org/v1/plot/vg"
)

type binds []string

func (b binds) String() string {
	return strings.Join(b, ",")
}

func (b *binds) Set(v string) error {
	*b = strings.Split(v, ",")
	return nil
}

// Size is needed by the /demo/upload handler to determine the size of the uploaded file
type Size interface {
	Size() int64
}

func init() {
	http.HandleFunc("/demo/tile", func(w http.ResponseWriter, r *http.Request) {
		// Small 40x40 png
		w.Write([]byte{
			0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
			0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x28, 0x00, 0x00, 0x00, 0x28,
			0x01, 0x03, 0x00, 0x00, 0x00, 0xb6, 0x30, 0x2a, 0x2e, 0x00, 0x00, 0x00,
			0x03, 0x50, 0x4c, 0x54, 0x45, 0x5a, 0xc3, 0x5a, 0xad, 0x38, 0xaa, 0xdb,
			0x00, 0x00, 0x00, 0x0b, 0x49, 0x44, 0x41, 0x54, 0x78, 0x01, 0x63, 0x18,
			0x61, 0x00, 0x00, 0x00, 0xf0, 0x00, 0x01, 0xe2, 0xb8, 0x75, 0x22, 0x00,
			0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
		})
	})

	http.HandleFunc("/demo/tiles", func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, "<html><head><style>img{width:40px;height:40px;}</style></head><body>")
		for i := 0; i < 200; i++ {
			fmt.Fprintf(w, `<img src="/demo/tile?cachebust=%d">`, i)
		}
		io.WriteString(w, "</body></html>")
	})

	http.HandleFunc("/demo/echo", func(w http.ResponseWriter, r *http.Request) {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Printf("error reading body while handling /echo: %s\n", err.Error())
		}
		w.Write(body)
	})

	// accept file uploads and return the MD5 of the uploaded file
	// maximum accepted file size is 1 GB
	http.HandleFunc("/demo/upload", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			err := r.ParseMultipartForm(1 << 30) // 1 GB
			if err == nil {
				var file multipart.File
				file, _, err = r.FormFile("uploadfile")
				if err == nil {
					var size int64
					if sizeInterface, ok := file.(Size); ok {
						size = sizeInterface.Size()
						b := make([]byte, size)
						file.Read(b)
						md5 := md5.Sum(b)
						fmt.Fprintf(w, "%x", md5)
						return
					}
					err = errors.New("couldn't get uploaded file size")
				}
			}
			if err != nil {
				utils.Infof("Error receiving upload: %#v", err)
			}
		}
		io.WriteString(w, `<html><body><form action="/demo/upload" method="post" enctype="multipart/form-data">
				<input type="file" name="uploadfile"><br>
				<input type="submit">
			</form></body></html>`)
	})
}

func getBuildDir() string {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		panic("Failed to get current frame")
	}

	return path.Dir(filename)
}

func main() {
	// defer profile.Start().Stop()
	go func() {
		log.Println(http.ListenAndServe("0.0.0.0:6060", nil))
	}()
	// runtime.SetBlockProfileRate(1)

	verbose := flag.Bool("v", false, "verbose")
	bs := binds{}
	flag.Var(&bs, "bind", "bind to")
	certPath := flag.String("certpath", getBuildDir(), "certificate directory")
	www := flag.String("www", "/home/pronaya/go/src/github.com/lucas-clemente/quic-go/example/ppd/server/", "www data")
	tcp := flag.Bool("tcp", false, "also listen on TCP")
	flag.Parse()

	if *verbose {
		utils.SetLogLevel(utils.LogLevelDebug)
	} else {
		utils.SetLogLevel(utils.LogLevelInfo)
	}
	utils.SetLogTimeFormat("")

	certFile := *certPath + "/fullchain.pem"
	keyFile := *certPath + "/privkey.pem"

	_ = www

	var countClient = make(map[string]int)
	var weightInfo = make(map[string]float64)
	var utilityInfo = make(map[string]float64)
	var utilityInfo_new = make(map[string]float64)
	var weightInfo_new = make(map[string]float64)
	// weightSum := 0.0
	var clientInfo = make(map[string]map[string]string)
	var qoe_1 [50][2]float64
	i1, i11 := 1, 1
	var qoe_2 [50][2]float64
	i2, i22 := 1, 1
	u1_sum, u1_avg, u2_sum, u2_avg := 0.0, 0.0, 0.0, 0.0
	u1_avg_after, u2_avg_after := 0.0, 0.0
	u1_sum_after, u2_sum_after := 0.0, 0.0
	u1_sum_before, u1_avg_before := 0.0, 0.0
	u2_sum_before, u2_avg_before := 0.0, 0.0
	// lastBuffer := 0.0
	// lastBuffer2 := 0.0
	// lastBuffer_if := 0
	// lastBuffer_if2 := 0
	plot_if := 0
	plot_down := 0
	Timer_global := 0.0
	qoe_past := 0.0
	//http.Handle("/", http.FileServer(http.Dir(*www)))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		u, err := url.Parse(fmt.Sprintf("%v", r.URL))
		if err != nil {
			panic(err)
		}
		m, _ := url.ParseQuery(u.RawQuery)
		// fmt.Println(m["Common-Media-Client-Data"])
		// fmt.Printf("%s\n", r.URL)

		req_data := fmt.Sprintf("%s", m["Common-Media-Client-Data"])
		req_data = strings.Trim(req_data, "[]")
		req_data_split := strings.Split(req_data, ",")

		// fmt.Println(req_data)
		// v=1,sid="1001",cid="ppd001_2.663_1.992_17_20_2875_30_3_2",did="ppd001",st=v,sf=d,br=3936,ot=v,d=4000,mtp=5498,dl=5456
		// fmt.Println(req_data_split)
		// [v=1 sid="1001" cid="ppd001_2.663_1.992_17_20_2875_30_3_2" did="ppd001" st=v sf=d br=3936 ot=v d=4000 mtp=5498 dl=5456]

		var req_data_map = make(map[string]string)
		var req_data_map_new = make(map[string]string)

		if len(req_data_split) > 1 {
			for _, s := range req_data_split {
				key_val := strings.Split(s, "=")
				if len(key_val) > 1 {
					// fmt.Println(key_val[0], key_val[1])
					req_data_map[key_val[0]] = strings.Trim(key_val[1], "\"")
				}
			}

		}

		dash_data := fmt.Sprintf("%s", req_data_map["cid"])
		// fmt.Println(dash_data)
		//dash_data = strings.Trim(dash_data, "\"")
		dash_data_split := strings.Split(dash_data, "_")
		fmt.Println(dash_data_split)
		if len(dash_data_split) > 3 && dash_data_split[0] == req_data_map["did"] {
			req_data_map_new["videoDownloadTime"] = dash_data_split[1]
			req_data_map_new["videoBufferLength"] = dash_data_split[2]
			req_data_map_new["videoCurrentQuality"] = dash_data_split[3]
			req_data_map_new["videoPreviousQuality"] = dash_data_split[4]
			req_data_map_new["videoBitrateKbps"] = dash_data_split[5]
			req_data_map_new["clientLocation"] = dash_data_split[6]
			req_data_map_new["clientSpeed"] = dash_data_split[7]
			req_data_map_new["clientDirection"] = dash_data_split[8]
			req_data_map_new["timer"] = dash_data_split[9]
			DownloadTime, _ := strconv.ParseFloat(req_data_map_new["videoDownloadTime"], 64)
			BufferTime, _ := strconv.ParseFloat(req_data_map_new["videoBufferLength"], 64)
			CurrentQuality, _ := strconv.ParseFloat(req_data_map_new["videoCurrentQuality"], 64)
			PreviousQuality, _ := strconv.ParseFloat(req_data_map_new["videoPreviousQuality"], 64)
			CurrentBitrate, _ := strconv.ParseFloat(req_data_map_new["videoBitrateKbps"], 64)
			Timer, _ := strconv.ParseFloat(req_data_map_new["timer"], 64)
			Timer_global = Timer
			rebuffering := DownloadTime - BufferTime
			smoothness := math.Abs(CurrentQuality - PreviousQuality)

			Pck := 30.0
			if CurrentBitrate >= 177 && CurrentBitrate < 509 {
				Pck = 51
			} else if CurrentBitrate >= 509 && CurrentBitrate < 782 {
				Pck = 62
			} else if CurrentBitrate >= 782 && CurrentBitrate < 2087 {
				Pck = 82
			} else if CurrentBitrate >= 2087 {
				Pck = 85
			}
			Pck_previous := 30.0
			if PreviousQuality >= 177 && PreviousQuality < 509 {
				Pck_previous = 51
			} else if PreviousQuality >= 509 && PreviousQuality < 782 {
				Pck_previous = 62
			} else if PreviousQuality >= 782 && PreviousQuality < 2087 {
				Pck_previous = 82
			} else if PreviousQuality >= 2087 {
				Pck_previous = 85
			}
			smoothness_pck := math.Abs(Pck - Pck_previous)

			// 	}
			// } else if req_data_map["did"] == "ppd002" {
			// 	// rebuffering = rebuffering - stay time
			// 	rebuffering = rebuffering - (60 - Timer)
			// 	//C2 lost connection when Timer>60
			// 	if Timer > 60 {
			// 		if lastBuffer_if2 == 0 {
			// 			lastBuffer2 = BufferTime
			// 			lastBuffer_if2 = 1
			// 		}
			// 		CurrentBitrate = 0
			// 		smoothness = 0
			// 		// DownloadTime is current handover time + average DownloatTime
			// 		// So DownloadTime = (30 - (Timer-60)) +2
			// 		// Buffertime = lastBuffer2-(Timer-60)
			// 		// rebuffering = ((30 - (Timer - 60)) + 2) - (lastBuffer2 - (Timer - 60)) + (30 - (Timer - 60))
			// 		if lastBuffer2-(Timer-60) > 0 {
			// 			rebuffering = ((30 - (Timer - 60)) + 2) - (lastBuffer2 - (Timer - 60))
			// 		} else {
			// 			rebuffering = 2
			// 		}
			// 	}
			// }
			qoe := Pck - 25*rebuffering - 2.5*smoothness_pck
			utility := (qoe_past + qoe*2) / 3
			qoe_past = qoe
			if req_data_map["did"] == "ppd001" {
				// rebuffering = rebuffering -stay time
				rebuffering = rebuffering - (40 - Timer)
				//C1 lost connection when Timer > 40
			}
			if req_data_map["did"] == "ppd002" {
				// rebuffering = rebuffering -stay time
				rebuffering = rebuffering - (60 - Timer)
				//C1 lost connection when Timer > 40
			}
			qoe_our := CurrentBitrate - 20*rebuffering - 0.1*smoothness

			// weight := CurrentBitrate / utility
			weight := CurrentBitrate - 20*rebuffering - 0.1*smoothness

			if req_data_map["did"] == "ppd001" {
				if Timer != 0 && Timer < 60 && Timer != qoe_1[i1-1][0] {
					qoe_1[i1][0] = Timer
					qoe_1[i1][1] = qoe_our
					i1 = i1 + 1
					if Timer < 40 {
						i11 = i11 + 1
						u1_sum_before = u1_sum_before + qoe_our
						u1_avg_before = u1_sum_before / float64(i1)
					} else if Timer >= 40 {
						u1_sum_after = u1_sum_after + utility
						u1_avg_after = u1_sum_after / float64(i1-i11)
					}
				}

			} else if req_data_map["did"] == "ppd002" {
				if Timer != 0 && Timer < 90 && Timer != qoe_2[i2-1][0] {
					qoe_2[i2][0] = Timer
					qoe_2[i2][1] = qoe_our
					i2 = i2 + 1
					if Timer < 60 {
						i22 = i22 + 1
						u2_sum_before = u2_sum_before + qoe_our
						u2_avg_before = u2_sum_before / float64(i2)
					} else if Timer >= 60 {
						u2_sum_after = u2_sum_after + utility
						u2_avg_after = u2_sum_after / float64(i2-i22)
					}
				}
			}
			// plot
			if Timer > 40 && plot_if == 0 && plot_down == 0 {
				plot_if = 1
			}

			if plot_if == 1 {
				p, _ := plot.New()

				p.Title.Text = "QoE_Client"
				p.X.Label.Text = "Time"
				p.Y.Label.Text = "QoE"

				pts1 := make(plotter.XYs, i1)
				for i := range pts1 {
					// pts1[i].X = float64(i)
					pts1[i].X = qoe_1[i][0]
					pts1[i].Y = qoe_1[i][1]
				}
				pts2 := make(plotter.XYs, i2)
				for i := range pts2 {
					// pts2[i].X = float64(i)
					pts2[i].X = qoe_2[i][0]
					pts2[i].Y = qoe_2[i][1]
				}
				// u1_avg = u1_avg_before*2/3 + u1_avg_after*1/3
				// u2_avg = u2_avg_before*2/3 + u2_avg_after*1/3
				u1_avg = u1_avg_before
				u2_avg = u2_avg_before

				str1 := "client1_QoE_avg=" + strconv.FormatFloat(u1_avg, 'f', 0, 64)
				str2 := "client2_QoE_avg=" + strconv.FormatFloat(u2_avg, 'f', 0, 64)
				plotutil.AddLinePoints(p, str1, pts1, str2, pts2)

				p.Save(4*vg.Inch, 4*vg.Inch, "QoE1and2.png")
				fmt.Println("plot saved")
				fmt.Println(pts1)
				fmt.Println(pts2)
				plot_if = 0
				plot_down = 1

			}
			if utility < 0 {
				utility = 1
			}
			req_data_map_new["utility"] = fmt.Sprintf("%.5f", utility)
			req_data_map_new["weight"] = fmt.Sprintf("%.5f", weight)
			req_data_map_new["rebuffering"] = fmt.Sprintf("%.5f", rebuffering)
			req_data_map_new["smoothness"] = fmt.Sprintf("%.5f", smoothness)
			weightInfo[dash_data_split[0]] = weight // weightInfo is currentbitrate
			utilityInfo[dash_data_split[0]] = utility

		}
		// fmt.Println("u1:u2:u3=",u1,u2,u3)
		// fmt.Println("w1:w2:w3=",w1,w2,w3)
		// u1_bandwidth := u1/(u1+u2+u3)
		// u2_bandwidth := u2/(u1+u2+u3)
		// u3_bandwidth := u3/(u1+u2+u3)
		// fmt.Printf("u_bandwidth= %.5f  %.5f  %.5f\n",u1_bandwidth, u2_bandwidth, u3_bandwidth)

		clientInfo[fmt.Sprintf("%s", req_data_map["did"])] = req_data_map_new

		fmt.Println("clientInfo:\n", clientInfo)
		fmt.Println("bitrateInfo:\n", weightInfo)
		fmt.Println("utilityInfo:\n", utilityInfo)

		// fmt.Println(req_data_map["videoBitrateKbps"])
		// fmt.Println("buffertime:", req_data_map["videoBufferLength"])
		// fmt.Println("downloadtime:", req_data_map["videoDownloadTime"])
		// fmt.Println(req_data_map["videoPreviousQuality"])

		// var countClient = make(map[string]int)
		countClient[req_data_map["did"]] = 1
		// fmt.Println(countClient)
		countClientNum := 0
		for c := range countClient {
			countClientNum = countClientNum + countClient[c]
		}
		fmt.Println("clientnumber:", countClientNum)

		utilitySum := 0.0
		for _, utility := range utilityInfo {
			utilitySum = utilitySum + utility
			// // fmt.Sprintf("%s", )
			// fmt.Println(clientInfo)
		}

		for c, utility := range utilityInfo {
			utilityInfo_new[c] = utility / utilitySum
		}

		for c, _ := range weightInfo {
			weightInfo_new[c] = 1 / utilityInfo_new[c]
			// // fmt.Sprintf("%s", )
			// fmt.Println(clientInfo)
		}
		fmt.Println("weightInfo:\n", weightInfo_new)

		weightSum := 0.0
		for _, weight := range weightInfo_new {
			weightSum = weightSum + weight
			// // fmt.Sprintf("%s", )
			// fmt.Println(clientInfo)
		}

		fmt.Println("weightSum=", weightSum)

		// fmt.Println("utilitySum=", utilitySum)
		// fmt.Println("UtilityInfo_new:\n", utilityInfo_new)
		// fmt.Println("weightInfo_new:\n", weightInfo_new)

		fmt.Println(qoe_1, "\n", qoe_2)
		fmt.Println("u1_sum, u1_avg, u2_sum, u2_avg:=", u1_sum, u1_avg, u2_sum, u2_avg)
		// fmt.Println("UtilityInfo:\n", utilityInfo)

		// bandwidth_r := float64(1024 * 1024) //in Byte (1024*768 = 6 Mbps)
		bandwidth_default := float64(1024*768) / 6 * 5
		bandwidth_r := bandwidth_default / 3 //in Byte (1024*768 = 6 Mbps)
		// bandwidth_r := bandwidth_default / 3 //in Byte (1024*768 = 6 Mbps)

		for clientName, weight := range weightInfo_new {
			// bandwidth_r = float64(bandwidth_r) * weight / weightSum
			weightPercentage := weight / weightSum
			if weightPercentage > 0.7 {
				weightPercentage = 0.7
			} else if weightPercentage < 0.3 {
				weightPercentage = 0.3
			}
			bandwidth_r = bandwidth_default * weightPercentage
			// bandwidth_r = bandwidth_default * 0.5
			// if Timer_global > 40 && Timer_global <= 60 {
			// 	bandwidth_r = bandwidth_default * 0.5
			// } else if Timer_global > 60 {
			// 	bandwidth_r = bandwidth_default * 0.5
			// }
			if Timer_global > 60 {
				bandwidth_r = bandwidth_default
			}

			fmt.Println(clientName, "Timer:", Timer_global, "bandwidth:", bandwidth_r, "weightPercentage:", weightPercentage, "\n")
			fmt.Println("u1_avg_after:", u1_avg_after, "u2_avg_after:", u2_avg_after)
		}

		// if bandwidth_r < (float64(1024*768) / 120) {
		// 	bandwidth_r = float64(1024*768) / 120
		// }

		// if req_data_map["did"] == "ppd001" {
		// 	for i, _ := range qoe_1 {
		// 		// C1在36秒后出去
		// 		if qoe_1[i][0] > 36 {
		// 			bandwidth_r = 100
		// 		}
		// 	}
		// 	fmt.Println("C1_bandwidth:", bandwidth_r)
		// }

		if strings.Contains(fmt.Sprintf(r.URL.Path[1:]), "media") {
			fmt.Printf("Hello %s\n", r.URL.Path[1:])
			//w.Header().Set("Content-Type", mime.TypeByExtension(filepath.Ext(fmt.Sprintf(r.URL.Path))))
			//fmt.Printf("Content-Type %s\n", mime.TypeByExtension(filepath.Ext(fmt.Sprintf(r.URL.Path[1:]))))

			w.Header().Set("Content-Disposition", "attachment; filename="+filepath.Base(fmt.Sprintf(r.URL.Path[1:])))
			w.Header().Set("Content-Type", "application/octet-stream")
			//w.Header().Set("Content-Length", r.Header.Get("Content-Length"))

			file, err := os.Open(fmt.Sprintf(r.URL.Path[1:]))
			if err != nil {
				http.NotFound(w, r)
				return
			}
			defer file.Close()

			fi, err := file.Stat()
			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}
			w.Header().Set("Content-Length", fmt.Sprint(fi.Size()))
			fmt.Printf("File_Size %s\n", fmt.Sprint(fi.Size()))

			bucket := ratelimit.NewBucketWithRate(float64(bandwidth_r), int64(bandwidth_r))
			reader := bufio.NewReader(file)
			io.Copy(w, ratelimit.Reader(reader, bucket))
			//io.Copy(w, file)

			/////////////////////////////////////////////
			//Showing chosen file

			//fmt.Printf("File %s\n", r.URL.Path)
			if strings.Contains(fmt.Sprintf(r.URL.Path[1:]), "bps") {
				dir := filepath.Dir(r.URL.Path)
				parent := filepath.Base(dir)

				bitrate := strings.Split(parent, "_")
				bitrate_s := fmt.Sprint(bitrate[1])
				sz := len(bitrate[1])
				if sz > 3 {
					bitrate_s = bitrate_s[:sz-3]

					bitrate_f, _ := strconv.ParseFloat(bitrate_s, 64)
					fmt.Printf("Bitrate %f Kbps\n", bitrate_f/(1024))
				}
			}
		} else {

			//io.WriteString(w, "Invalid request.")
			http.ServeFile(w, r, r.URL.Path[1:])

		}

	})

	if len(bs) == 0 {
		bs = binds{"0.0.0.0:6121"}
	}

	var wg sync.WaitGroup
	wg.Add(len(bs))
	for _, b := range bs {
		bCap := b
		go func() {
			var err error
			_ = tcp
			/*
				if *tcp {
					err = h2quic.ListenAndServe(bCap, certFile, keyFile, nil)
				} else {
					err = h2quic.ListenAndServeQUIC(bCap, certFile, keyFile, nil)
				}
			*/
			err = h2quic.ListenAndServeQUIC(bCap, certFile, keyFile, nil)
			if err != nil {
				fmt.Println(err)
			}
			wg.Done()
		}()
	}
	wg.Wait()
}
