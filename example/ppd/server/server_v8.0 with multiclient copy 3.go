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

func bitrateTrans(x float64) float64 {
	return 16.608*math.Log(x) - 42.943
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

	// var countClient = make(map[string]int)
	var weightInfo = make(map[string]float64)
	var utilityInfo = make(map[string]float64)
	// var utilityInfo_new = make(map[string]float64)
	var weightInfo_new = make(map[string]float64)
	// weightSum := 0.0
	var clientInfo = make(map[string]map[string]string)
	clientQoE := make(map[string]map[float64]float64)
	clientQoE_chunk := make(map[string]map[string]float64)
	clientQoE_avg := make(map[string]float64)
	clientQoE_avg_chunk := make(map[string]float64)
	// client1_reqTime:= []
	// u1_sum, u1_avg, u2_sum, u2_avg := 0.0, 0.0, 0.0, 0.0
	// Timer_before := 0.0

	// lastBuffer := 0.0
	// lastBuffer2 := 0.0
	// lastBuffer3 := 0.0
	// lastBuffer_if := 0
	// lastBuffer_if2 := 0
	// lastBuffer_if3 := 0
	Timer_global := 0.0
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

		fmt.Println(req_data_map)

		dash_data := fmt.Sprintf("%s", req_data_map["cid"])
		// fmt.Println(dash_data)
		//dash_data = strings.Trim(dash_data, "\"")
		dash_data_split := strings.Split(dash_data, "_")
		fmt.Println(dash_data_split)
		fmt.Println(dash_data_split[0])
		if len(dash_data_split) > 3 && dash_data_split[0] == req_data_map["did"] {
			req_data_map_new["videoDownloadTime"] = dash_data_split[1]
			req_data_map_new["videoBufferLength"] = dash_data_split[2]
			req_data_map_new["videoCurrentQuality"] = dash_data_split[3]
			req_data_map_new["videoPreviousQuality"] = dash_data_split[4]
			req_data_map_new["videoBitrateKbps"] = dash_data_split[5]
			// req_data_map_new["clientLocation"] = dash_data_split[6]
			// req_data_map_new["clientSpeed"] = dash_data_split[7]
			// req_data_map_new["clientDirection"] = dash_data_split[8]
			req_data_map_new["timer"] = dash_data_split[9]
			// req_data_map_new["qoe_sum"] = "0.0"
			DownloadTime, _ := strconv.ParseFloat(req_data_map_new["videoDownloadTime"], 64)
			BufferTime, _ := strconv.ParseFloat(req_data_map_new["videoBufferLength"], 64)
			CurrentQuality, _ := strconv.ParseFloat(req_data_map_new["videoCurrentQuality"], 64)
			PreviousQuality, _ := strconv.ParseFloat(req_data_map_new["videoPreviousQuality"], 64)
			CurrentBitrate, _ := strconv.ParseFloat(req_data_map_new["videoBitrateKbps"], 64)
			Timer, _ := strconv.ParseFloat(req_data_map_new["timer"], 64)
			Timer, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", Timer), 64)
			Timer_global = Timer
			rebuffering := DownloadTime - BufferTime
			// smoothness := math.Abs(bitrateTrans(CurrentQuality) - bitrateTrans(PreviousQuality))
			smoothness := math.Abs(CurrentQuality - PreviousQuality)
			fmt.Println(CurrentQuality, PreviousQuality, "*****smm", smoothness)

			if req_data_map["did"] == "ppd001" || req_data_map["did"] == "ppd004" || req_data_map["did"] == "ppd007" || req_data_map["did"] == "ppd0010" {
				// rebuffering = rebuffering -stay time
				if Timer <= 30 {
					// rebuffering = rebuffering - 60
					// } else if Timer <= 90 {
					rebuffering = rebuffering - (30 - Timer)
					// } else if Timer <= 120 {
					// 	rebuffering = rebuffering - 60
					// } else if Timer <= 180 {
					// 	rebuffering = rebuffering - (180 - Timer)
				}
			} else if req_data_map["did"] == "ppd002" || req_data_map["did"] == "ppd005" || req_data_map["did"] == "ppd008" || req_data_map["did"] == "ppd0011" {
				// rebuffering = rebuffering - stay time
				// if Timer <= 30 {
				// 	rebuffering = rebuffering - 60
				// } else if Timer <= 90 {
				rebuffering = rebuffering - (60 - Timer)
				// } else if Timer <= 120 {
				// 	rebuffering = rebuffering - 60
				// } else if Timer <= 180 {
				// 	rebuffering = rebuffering - (200 - Timer)
				// }
			} else if req_data_map["did"] == "ppd003" || req_data_map["did"] == "ppd006" || req_data_map["did"] == "ppd009" || req_data_map["did"] == "ppd012" {
				// rebuffering = rebuffering - stay time
				// if Timer <= 30 {
				rebuffering = rebuffering - 60
				// } else if Timer <= 90 {
				// 	rebuffering = rebuffering - (100 - Timer)
				// } else if Timer <= 120 {
				// 	rebuffering = rebuffering - 60
				// } else if Timer <= 180 {
				// 	rebuffering = rebuffering - (190 - Timer)
				// }
			}
			// rebuffering = 60
			// utility := 50*bitrateTrans(CurrentBitrate) - 20*rebuffering - 30*smoothness
			utility := CurrentBitrate - 20*rebuffering - 0.1*smoothness
			utility, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", utility), 64)
			// utility := 50*bitrateTrans(CurrentBitrate) - 20*rebuffering - 0.1*smoothness
			if utility < 0 {
				utility = 1
			}
			weight := CurrentBitrate / utility
			// weight := 1 / utility

			// weight := CurrentBitrate

			// if Timer != Timer_before {
			// 	qoe_sum, _ := strconv.ParseFloat(req_data_map_new["qoe_sum"], 64)
			// 	qoe_sum = qoe_sum + utility
			// 	req_data_map_new["qoe_sum"] = strconv.FormatFloat(qoe_sum, 'f', -1, 64)
			// } else {
			// 	qoe_sum, _ := strconv.ParseFloat(req_data_map_new["qoe_sum"], 64)
			// 	req_data_map_new["qoe_sum"] = strconv.FormatFloat(qoe_sum, 'f', -1, 64)
			// }
			// Timer_before = Timer

			var addClient func(client string)
			addClient = func(client string) {
				_, exist := clientQoE[client]
				if exist {
					clientQoE[client][Timer_global] = utility
				} else {
					timeQoE := make(map[float64]float64)
					timeQoE[Timer_global] = utility
					clientQoE[client] = timeQoE
				}
			}

			_, ok := clientQoE[req_data_map["did"]]
			if ok {
				clientQoE[req_data_map["did"]][Timer_global] = utility

				if Timer_global >= 90 && req_data_map["did"] == "ppd006" {
					addClient("client11")
				}
				if Timer_global >= 90 && req_data_map["did"] == "ppd007" {
					addClient("client12")
				}
				if Timer_global >= 90 && req_data_map["did"] == "ppd008" {
					addClient("client13")
				}
				if Timer_global >= 90 && req_data_map["did"] == "ppd009" {
					addClient("client14")
				}
				if Timer_global >= 90 && req_data_map["did"] == "ppd0010" {
					addClient("client15")
				}

			} else {
				timeQoE := make(map[float64]float64)
				timeQoE[Timer_global] = utility
				clientQoE[req_data_map["did"]] = timeQoE
			}

			_, ok2 := clientQoE_chunk[req_data_map["did"]]
			// chunkNum := strings.Replace(r.URL.Path[1:], "media/BigBuckBunny/4sec/", "", -1)
			chunkNum := filepath.Base(r.URL.Path[1:])
			var addClient_chunk func(client string)
			addClient_chunk = func(client string) {
				_, exist2 := clientQoE_chunk[client]
				if exist2 {
					clientQoE_chunk[client][chunkNum] = utility
				} else {
					timeQoE := make(map[string]float64)
					timeQoE[chunkNum] = utility
					clientQoE_chunk[client] = timeQoE
				}
			}
			if ok2 {

				clientQoE_chunk[req_data_map["did"]][chunkNum] = utility

				/*新计算方法 */
				// fmt.Println(clientQoE_chunk)
				// fmt.Println(req_data_map["did"], chunkNum)
				// fmt.Println(req_data_map["did"], r.URL.Path[1:])

				/* */

				if Timer_global >= 90 && req_data_map["did"] == "ppd006" {
					addClient_chunk("client11")
				}
				if Timer_global >= 90 && req_data_map["did"] == "ppd007" {
					addClient_chunk("client12")
				}
				if Timer_global >= 90 && req_data_map["did"] == "ppd008" {
					addClient_chunk("client13")
				}
				if Timer_global >= 90 && req_data_map["did"] == "ppd009" {
					addClient_chunk("client14")
				}
				if Timer_global >= 90 && req_data_map["did"] == "ppd0010" {
					addClient_chunk("client15")
				}

			} else {
				timeQoE := make(map[string]float64)
				timeQoE[chunkNum] = utility
				clientQoE_chunk[req_data_map["did"]] = timeQoE
			}

			for client := range clientQoE {

				// fmt.Println("client:", client, "qoe:", clientQoE[client])
				t_count := 0.0
				qoe_sum := 0.0
				for time := range clientQoE[client] {
					t_count = t_count + 1
					qoe_sum = qoe_sum + clientQoE[client][time]
				}
				// fmt.Println("t_count:", t_count, "qoe_sum:", qoe_sum)
				qoe_avg := qoe_sum / t_count
				qoe_avg, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_avg), 64)
				clientQoE_avg[client] = qoe_avg

				// fmt.Println("clientQoE:", clientQoE)
				// fmt.Println("clientQoE_avg:", clientQoE_avg)

				// fmt.Println("qoe_avg", client, ":", qoe_avg)
			}

			for client := range clientQoE_chunk {

				// fmt.Println("client:", client, "qoe:", clientQoE[client])
				t_count := 0.0
				qoe_sum := 0.0
				for time := range clientQoE_chunk[client] {
					t_count = t_count + 1
					qoe_sum = qoe_sum + clientQoE_chunk[client][time]
				}
				// fmt.Println("t_count_chunk:", t_count, "qoe_sum:", qoe_sum)
				qoe_avg := qoe_sum / t_count
				qoe_avg, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_avg), 64)
				clientQoE_avg_chunk[client] = qoe_avg

				// fmt.Println("clientQoE:", clientQoE)
				// fmt.Println("clientQoE_avg:", clientQoE_avg)

				// fmt.Println("qoe_avg_chunk", client, ":", qoe_avg)
			}

			// plot
			if Timer > 30 {
				for client := range clientQoE {
					fmt.Println("client:", client, "qoe:", clientQoE[client])
				}
				for client := range clientQoE_chunk {
					fmt.Println("client_chunk:", client, "qoe:", clientQoE_chunk[client])
				}

				fmt.Println(clientQoE_avg)
				fmt.Println("chunk:", clientQoE_avg_chunk)
				fmt.Println("----------------------------------")
				for client := range clientQoE_avg {
					fmt.Println("qoe_avg", client, ":", clientQoE_avg[client])
				}
				fmt.Println("----------------------------------")
				for client := range clientQoE_avg_chunk {
					fmt.Println("qoe_avg_chunk", client, ":", clientQoE_avg_chunk[client])
				}

				os.Exit(1)
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

		// fmt.Println("req_data_map_new:\n", req_data_map_new)
		clientInfo[fmt.Sprintf("%s", req_data_map["did"])] = req_data_map_new

		// fmt.Println("clientInfo:\n", clientInfo)
		// fmt.Println("weightInfo:\n", weightInfo)
		// fmt.Println("utilityInfo:\n", utilityInfo)

		// fmt.Println(req_data_map["videoBitrateKbps"])
		// fmt.Println("buffertime:", req_data_map["videoBufferLength"])
		// fmt.Println("downloadtime:", req_data_map["videoDownloadTime"])
		// fmt.Println(req_data_map["videoPreviousQuality"])

		weightSum := 0.0
		clientNum := 0.0
		for _, weight := range weightInfo {
			weightSum = weightSum + weight
			clientNum = clientNum + 1
			// weightInfo_new[c] = bitrate / utilityInfo[c]
			// // fmt.Sprintf("%s", )
			// fmt.Println(clientInfo)
		}
		fmt.Println("clientnumber:", clientNum)
		fmt.Println("weightInfo:\n", weightInfo)

		for c, weight := range weightInfo {
			if weight < (weightSum/clientNum)*0.6 {
				weightInfo_new[c] = (weightSum / clientNum) * 0.6
			} else {
				weightInfo_new[c] = weight
			}
			// // fmt.Sprintf("%s", )
			// fmt.Println(clientInfo)
		}
		fmt.Println("weightInfo_new:\n", weightInfo_new)
		weightSum_new := 0.0
		for _, weight := range weightInfo_new {
			weightSum_new = weightSum_new + weight
		}

		// fmt.Print(clientQoE)

		// fmt.Println("utilitySum=", utilitySum)
		// fmt.Println("UtilityInfo_new:\n", utilityInfo_new)
		// fmt.Println("weightInfo_new:\n", weightInfo_new)

		// fmt.Println(qoe_1, "\n", qoe_2, "\n", qoe_3)
		// fmt.Println("u1_sum, u1_avg, u2_sum, u2_avg:=", u1_sum, u1_avg, u2_sum, u2_avg)
		// fmt.Println("UtilityInfo:\n", utilityInfo)

		// bandwidth_r := float64(1024 * 1024) //in Byte (1024*768 = 6 Mbps)
		bandwidth_default := float64(1024*768) / 6 * 25
		// bandwidth_r := bandwidth_default * 2 / 18 //in Byte (1024*768 = 6 Mbps)
		bandwidth_r := bandwidth_default / 10 //in Byte (1024*768 = 6 Mbps)

		for clientName, weight := range weightInfo_new {
			// bandwidth_r = float64(bandwidth_r) * weight / weightSum
			weightPercentage := weight / weightSum_new

			// bandwidth_r = bandwidth_default * weightPercentage
			bandwidth_r = bandwidth_default * 1 / 10

			fmt.Println(clientName, "Timer:", Timer_global, "bandwidth:", bandwidth_r, "weightPercentage:", weightPercentage, "\n")
			// fmt.Println("u1_avg_after:", u1_avg_after, "u2_avg_after:", u2_avg_after)
		}

		if strings.Contains(fmt.Sprintf(r.URL.Path[1:]), "media") {

			fmt.Println(Timer_global)
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