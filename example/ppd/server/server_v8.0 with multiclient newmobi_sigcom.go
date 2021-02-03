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
	"time"

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
	var weightInfo_p = make(map[string]float64)
	beta := 10.0
	label := ""
	// weightSum := 0.0
	var clientInfo = make(map[string]map[string]string)
	// clientQoE := make(map[string]map[float64]float64)
	clientQoE_chunk := make(map[string]map[string]float64)
	clientQoE_chunkNum_totalQoe := make(map[string]map[string]float64)
	clientQoE_chunkNum_totalQoe2 := make(map[string]map[string]float64)
	clientQoE_chunkNum_totalQoe3 := make(map[string]map[string]float64)
	clientQoE_chunkNum_totalQoe4 := make(map[string]map[string]float64)
	clientQoE_chunkNum_totalQoe_final := make(map[string]map[string]float64)
	clientQoE_avg := make(map[string]float64)
	clientQoE_avg_chunk := make(map[string]float64)
	// client1_reqTime:= []
	// u1_sum, u1_avg, u2_sum, u2_avg := 0.0, 0.0, 0.0, 0.0
	// Timer_before := 0.0

	lastBuffer := make(map[string]float64)
	lastBuffer2 := make(map[string]float64)
	lastBuffer3 := make(map[string]float64)
	lastBitrate := make(map[string]float64)
	lastBitrate2 := make(map[string]float64)
	lastBitrate3 := make(map[string]float64)
	// C1_info := make(map[float64]map[string]float64)
	// C2_info := make(map[float64]map[string]float64)
	// C3_info := make(map[float64]map[string]float64)
	// C4_info := make(map[float64]map[string]float64)

	// weightP_C1 := make(map[float64]float64)
	// bitrateReq_C1 := make(map[float64]float64)
	// buffer_C1 := make(map[float64]float64)
	// weightP_C4 := make(map[float64]float64)
	// bitrateReq_C4 := make(map[float64]float64)
	// buffer_C4 := make(map[float64]float64)
	// weightP_C2 := make(map[float64]float64)
	// bitrateReq_C2 := make(map[float64]float64)
	// buffer_C2 := make(map[float64]float64)
	// weightP_C3 := make(map[float64]float64)
	// bitrateReq_C3 := make(map[float64]float64)
	// buffer_C3 := make(map[float64]float64)
	// lastBuffer2 := 0.0
	// lastBuffer3 := 0.0
	// lastBuffer_if := 0
	// lastBuffer_if2 := 0
	// lastBuffer_if3 := 0
	var timer_start bool
	timer_start = true
	var startTime = time.Now()
	Timer_global := 0.0
	qoe_past := 0.0

	updateWeightTime := 0.0
	updateWeightFlag := make(map[string]bool)
	updateWeightFlag["ppd001"] = true
	updateWeightFlag["ppd002"] = true
	updateWeightFlag["ppd003"] = true
	updateWeightFlag["ppd004"] = true
	updateWeightFlag["ppd005"] = true
	updateWeightFlag["ppd006"] = true
	updateWeightFlag["ppd007"] = true
	updateWeightFlag["ppd008"] = true
	updateWeightFlag["ppd009"] = true
	updateWeightFlag["ppd0010"] = true
	updateWeightFlag["ppd0011"] = true
	updateWeightFlag["ppd0012"] = true
	updateWeightFlag["ppd0013"] = true
	updateWeightFlag["ppd0014"] = true
	updateWeightFlag["ppd0015"] = true
	//http.Handle("/", http.FileServer(http.Dir(*www)))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// info_detail := make(map[string]float64)

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

		// fmt.Println(req_data_map)

		dash_data := fmt.Sprintf("%s", req_data_map["cid"])
		// fmt.Println(dash_data)
		//dash_data = strings.Trim(dash_data, "\"")
		dash_data_split := strings.Split(dash_data, "_")
		// fmt.Println(dash_data_split)
		// fmt.Println(dash_data_split[0])
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

			// 在收到第一个client的请求之后计时器开始，时间存入 Timer_global
			if req_data_map["did"] == "ppd001" && timer_start {
				startTime = time.Now()
				timer_start = false
			} else {
				currentTime := time.Now()
				Timer_global = currentTime.Sub(startTime).Seconds()
				Timer_global, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", Timer_global), 64)
			}

			// 90-130秒之间第一组client 在空白区域，清空这时候的clientQoE_chunk
			if Timer_global > 90 && Timer_global < 130 {
				delete(clientQoE_chunk, "ppd001")
				delete(clientQoE_chunk, "ppd004")
				delete(clientQoE_chunk, "ppd007")
				delete(clientQoE_chunk, "ppd0010")
				delete(clientQoE_chunk, "ppd0013")
				delete(weightInfo, "ppd001")
				delete(weightInfo, "ppd004")
				delete(weightInfo, "ppd007")
				delete(weightInfo, "ppd0010")
				delete(weightInfo, "ppd0013")
				delete(weightInfo_new, "ppd001")
				delete(weightInfo_new, "ppd004")
				delete(weightInfo_new, "ppd007")
				delete(weightInfo_new, "ppd0010")
				delete(weightInfo_new, "ppd0013")
			}

			// 220-260秒之间第一组client 在空白区域，清空这时候的clientQoE_chunk
			if Timer_global > 220 && Timer_global < 260 {
				delete(clientQoE_chunk, "ppd001")
				delete(clientQoE_chunk, "ppd004")
				delete(clientQoE_chunk, "ppd007")
				delete(clientQoE_chunk, "ppd0010")
				delete(clientQoE_chunk, "ppd0013")
				delete(weightInfo, "ppd001")
				delete(weightInfo, "ppd004")
				delete(weightInfo, "ppd007")
				delete(weightInfo, "ppd0010")
				delete(weightInfo, "ppd0013")
				delete(weightInfo_new, "ppd001")
				delete(weightInfo_new, "ppd004")
				delete(weightInfo_new, "ppd007")
				delete(weightInfo_new, "ppd0010")
				delete(weightInfo_new, "ppd0013")
			}

			// 156-225秒之间第二组client 在空白区域，清空这时候的clientQoE_chunk
			if Timer_global > 90/(150.0/260.0) && Timer_global < 130/(150.0/260.0) {
				delete(clientQoE_chunk, "ppd002")
				delete(clientQoE_chunk, "ppd005")
				delete(clientQoE_chunk, "ppd008")
				delete(clientQoE_chunk, "ppd0011")
				delete(clientQoE_chunk, "ppd0014")
				delete(weightInfo, "ppd002")
				delete(weightInfo, "ppd005")
				delete(weightInfo, "ppd008")
				delete(weightInfo, "ppd0011")
				delete(weightInfo, "ppd0014")
				delete(weightInfo_new, "ppd002")
				delete(weightInfo_new, "ppd005")
				delete(weightInfo_new, "ppd008")
				delete(weightInfo_new, "ppd0011")
				delete(weightInfo_new, "ppd0014")
			}

			// Timer_global = Timer
			rebuffering := DownloadTime - BufferTime
			// smoothness := math.Abs(bitrateTrans(CurrentQuality) - bitrateTrans(PreviousQuality))
			smoothness := math.Abs(CurrentQuality - PreviousQuality)
			// fmt.Println(CurrentQuality, PreviousQuality, "*****smm", smoothness)

			var stayTime float64
			if req_data_map["did"] == "ppd001" || req_data_map["did"] == "ppd004" || req_data_map["did"] == "ppd007" || req_data_map["did"] == "ppd0010" || req_data_map["did"] == "ppd0013" {
				// rebuffering = rebuffering -stay time
				if Timer_global <= 90 {
					stayTime = 90 - Timer_global
				} else if Timer_global <= 130 { //90s - 130s 在空白区域
					stayTime = 0
				} else if Timer_global <= 220 { //130s - 220s 在BS中
					stayTime = 90 - (Timer_global - 130)
				} else if Timer_global <= 260 { //220s - 260s 在空白区域
					stayTime = 0
				}
				if stayTime > 60 {
					stayTime = 60
				}
				rebuffering = rebuffering - stayTime

			} else if req_data_map["did"] == "ppd002" || req_data_map["did"] == "ppd005" || req_data_map["did"] == "ppd008" || req_data_map["did"] == "ppd0011" || req_data_map["did"] == "ppd0014" {
				// rebuffering = rebuffering - stay time
				// 实验时长260s， 第二组client 走到第一组client的150s的位置，所以速度为 150/260
				speed := 150.0 / 260.0
				if Timer_global <= (90 / speed) { // 90/speed = 156s, 在156秒离开第一个BS
					stayTime = 90 - Timer_global*speed // 156s 之前的staytime
				} else if Timer_global <= (130 / speed) { //130/speed = 225秒， 在156-225s 之间是空白区域
					stayTime = 0
				} else if Timer_global <= (220 / speed) { //220/speed = 386s  所以从225s-260s实验结束前 在BS中
					stayTime = 90 - (Timer_global*speed - 130)
				}
				if stayTime > 60 {
					stayTime = 60
				}
				rebuffering = rebuffering - stayTime
			} else if req_data_map["did"] == "ppd003" || req_data_map["did"] == "ppd006" || req_data_map["did"] == "ppd009" || req_data_map["did"] == "ppd012" || req_data_map["did"] == "ppd015" {
				// rebuffering = rebuffering - stay time
				// 实验时长260s， 第三组client 走到第一组client的80s的位置，所以速度为 80/260
				speed := 80.0 / 260.0
				if Timer_global <= (90 / speed) { // 90/speed = 300s, 在300秒离开第一个BS
					stayTime = 90 - Timer_global*speed // 300s 之前的staytime
				}
				if stayTime > 60 {
					stayTime = 60
				}
				rebuffering = rebuffering - stayTime
			}
			// rebuffering = 60
			// utility := 50*bitrateTrans(CurrentBitrate) - 20*rebuffering - 30*smoothness
			// utility := CurrentBitrate - beta*rebuffering - 0.1*smoothness
			// utility := CurrentBitrate - 20*rebuffering - 0.1*smoothness
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

			qoe := Pck - 25*rebuffering - 2.5*smoothness_pck
			utility := (qoe_past + qoe*2) / 3
			qoe_past = qoe
			utility, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", utility), 64)

			qoe_new := CurrentBitrate - beta*(DownloadTime-BufferTime) - 0.1*smoothness
			qoe_new, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_new), 64)
			// utility := 50*bitrateTrans(CurrentBitrate) - 20*rebuffering - 0.1*smoothness
			if utility < 0 {
				utility = 1
			}
			weight := CurrentBitrate / utility

			_, ok2 := clientQoE_chunk[req_data_map["did"]]
			// chunkNum := strings.Replace(r.URL.Path[1:], "media/BigBuckBunny/4sec/", "", -1)
			chunkNum := filepath.Base(r.URL.Path[1:])
			var addClient_chunk func(client string)
			addClient_chunk = func(client string) {
				_, exist2 := clientQoE_chunk[client]
				if exist2 {
					// clientQoE_chunk[client][chunkNum] = utility
					clientQoE_chunk[client][chunkNum] = qoe_new
				} else {
					timeQoE := make(map[string]float64)
					// timeQoE[chunkNum] = utility
					timeQoE[chunkNum] = qoe_new
					clientQoE_chunk[client] = timeQoE
				}
			}
			if ok2 {

				// clientQoE_chunk[req_data_map["did"]][chunkNum] = utility
				clientQoE_chunk[req_data_map["did"]][chunkNum] = qoe_new

				/*新计算方法 */
				// fmt.Println(req_data_map["did"], clientQoE_chunk)
				// fmt.Println(req_data_map["did"], chunkNum)
				// fmt.Println(req_data_map["did"], r.URL.Path[1:])

				/* */

				if Timer_global >= 261 && req_data_map["did"] == "ppd006" {
					addClient_chunk("client11")
				}
				if Timer_global >= 261 && req_data_map["did"] == "ppd007" {
					addClient_chunk("client12")
				}
				if Timer_global >= 261 && req_data_map["did"] == "ppd008" {
					addClient_chunk("client13")
				}
				if Timer_global >= 261 && req_data_map["did"] == "ppd009" {
					addClient_chunk("client14")
				}
				if Timer_global >= 261 && req_data_map["did"] == "ppd0010" {
					addClient_chunk("client15")
				}
				if Timer_global >= 130 && req_data_map["did"] == "ppd003" {
					addClient_chunk("client15")
				}

			} else {
				timeQoE := make(map[string]float64)
				// timeQoE[chunkNum] = utility
				timeQoE[chunkNum] = qoe_new
				clientQoE_chunk[req_data_map["did"]] = timeQoE
			}

			for client := range clientQoE_chunk {

				// fmt.Println("client:", client, "qoe:", clientQoE[client])
				t_count := 0.0
				qoe_sum := 0.0
				for time := range clientQoE_chunk[client] {
					t_count = t_count + 1
					qoe_sum = qoe_sum + clientQoE_chunk[client][time]
					qoe_sum, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum), 64)
				}
				// fmt.Println(client, "t_count_chunk:", t_count, "qoe_sum:", qoe_sum)

				/*	第一组      用户   信息    存储 	*/
				if client == "ppd001" || client == "ppd004" || client == "ppd007" || client == "ppd0010" || client == "ppd0013" {
					if Timer_global <= 90 {
						countNum_Qoe := make(map[string]float64)
						countNum_Qoe["t_count"] = t_count
						countNum_Qoe["qoe_sum"] = qoe_sum
						clientQoE_chunkNum_totalQoe[client] = countNum_Qoe
						// fmt.Println("clientQoE_chunkNum_totalQoe:", clientQoE_chunkNum_totalQoe)
						if req_data_map["did"] == "ppd001" || req_data_map["did"] == "ppd004" || req_data_map["did"] == "ppd007" || req_data_map["did"] == "ppd0010" || req_data_map["did"] == "ppd0013" {
							lastBuffer[req_data_map["did"]] = BufferTime
							lastBitrate[req_data_map["did"]] = CurrentBitrate
						}
						// fmt.Println("lastBuffer:", lastBuffer)

					} else if Timer_global <= 130 { //90s - 130s 在空白区域

					} else if Timer_global <= 220 { //130s - 220s 在BS中
						countNum_Qoe := make(map[string]float64)
						countNum_Qoe["t_count"] = t_count
						countNum_Qoe["qoe_sum"] = qoe_sum
						clientQoE_chunkNum_totalQoe2[client] = countNum_Qoe
						if req_data_map["did"] == "ppd001" || req_data_map["did"] == "ppd004" || req_data_map["did"] == "ppd007" || req_data_map["did"] == "ppd0010" || req_data_map["did"] == "ppd0013" {
							lastBuffer2[req_data_map["did"]] = BufferTime
							lastBitrate2[req_data_map["did"]] = CurrentBitrate
						}

						// fmt.Println("clientQoE_chunkNum_totalQoe:", clientQoE_chunkNum_totalQoe)
						// fmt.Println("clientQoE_chunkNum_totalQoe2:", clientQoE_chunkNum_totalQoe2)
						// fmt.Println("lastBuffer:", lastBuffer)
						// fmt.Println("lastBuffer2:", lastBuffer2)

					} else if Timer_global <= 260 { //220s - 260s 在空白区域

					}
				}
				/*	第一组      用户   信息    存储   结束	*/

				/*	第二组      用户   信息    存储 	*/
				if client == "ppd002" || client == "ppd005" || client == "ppd008" || client == "ppd0011" || client == "ppd0014" {

					speed := 150.0 / 260.0
					if Timer_global <= (90 / speed) { // 90/speed = 157s, 在157秒离开第一个BS
						countNum_Qoe := make(map[string]float64)
						countNum_Qoe["t_count"] = t_count
						countNum_Qoe["qoe_sum"] = qoe_sum
						clientQoE_chunkNum_totalQoe3[client] = countNum_Qoe
						if req_data_map["did"] == "ppd002" || req_data_map["did"] == "ppd005" || req_data_map["did"] == "ppd008" || req_data_map["did"] == "ppd0011" || req_data_map["did"] == "ppd0014" {
							lastBuffer3[req_data_map["did"]] = BufferTime
							lastBitrate3[req_data_map["did"]] = CurrentBitrate
						}

					} else if Timer_global <= (130 / speed) { //130/speed = 228秒， 在157-228s 之间是空白区域

					} else if Timer_global <= (220 / speed) { //220/speed = 386s  所以从228s-260s实验结束前 在BS中
						countNum_Qoe := make(map[string]float64)
						countNum_Qoe["t_count"] = t_count
						countNum_Qoe["qoe_sum"] = qoe_sum
						clientQoE_chunkNum_totalQoe4[client] = countNum_Qoe
						// lastBuffer2[req_data_map["did"]] = BufferTime

					}
				}
				/*	第二组      用户   信息    存储    结束	*/

				countNum_Qoe := make(map[string]float64)
				countNum_Qoe["t_count"] = t_count
				countNum_Qoe["qoe_sum"] = qoe_sum
				avg, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum/t_count), 64)
				countNum_Qoe["avg"] = avg

				clientQoE_chunkNum_totalQoe_final[client] = countNum_Qoe
				qoe_avg := qoe_sum / t_count
				qoe_avg, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_avg), 64)
				clientQoE_avg_chunk[client] = qoe_avg

				// fmt.Println("clientQoE:", clientQoE)
				// fmt.Println("clientQoE_avg:", clientQoE_avg)

				// fmt.Println("qoe_avg_chunk", client, ":", qoe_avg)
			}

			// plot
			if Timer_global > 260 {
				/*   计算 第一组client的最终qoe   */
				for client := range clientQoE_chunkNum_totalQoe {
					if client == "ppd001" || client == "ppd004" || client == "ppd007" || client == "ppd0010" || client == "ppd0013" {
						addChunk := lastBuffer[client] / 4.0
						addChunk, _ = strconv.ParseFloat(fmt.Sprintf("%.0f", addChunk), 64) // 取整
						var addQoe float64
						var addQoe2 float64
						var addQoe_serverPush float64
						var addQoe_serverPush2 float64
						if addChunk >= 10 {
							addChunk = 10
							addQoe = lastBitrate[client]*addChunk - beta*(0-lastBuffer[client])*addChunk/2 //CurrentBitrate - 20*(DownloadTime-BufferTime) - 0.1*smoothness
						} else {
							addQoe = lastBitrate[client]*addChunk - beta*(0-lastBuffer[client])*addChunk/2 //CurrentBitrate - 20*(DownloadTime-BufferTime) - 0.1*smoothness
							addQoe_serverPush = (lastBitrate[client]/2 + beta*(40-lastBuffer[client])) * (10 - addChunk)
							addChunk = 10
						}

						addChunk2 := lastBuffer2[client] / 4.0
						addChunk2, _ = strconv.ParseFloat(fmt.Sprintf("%.0f", addChunk2), 64) // 取整
						if addChunk2 >= 10 {
							addChunk2 = 10
							addQoe2 = lastBitrate2[client]*addChunk2 - beta*(0-lastBuffer[client])*addChunk/2 //CurrentBitrate - 20*(DownloadTime-BufferTime) - 0.1*smoothness

						} else {
							addQoe2 = lastBitrate2[client]*addChunk2 - beta*(0-lastBuffer[client])*addChunk/2 //CurrentBitrate - 20*(DownloadTime-BufferTime) - 0.1*smoothness
							addQoe_serverPush2 = (lastBitrate2[client]/2 + beta*(40-lastBuffer2[client])) * (10 - addChunk2)
							addChunk2 = 10
						}

						countNum_Qoe := make(map[string]float64)
						t_count := clientQoE_chunkNum_totalQoe[client]["t_count"] + addChunk + clientQoE_chunkNum_totalQoe2[client]["t_count"] + addChunk2
						qoe_sum := clientQoE_chunkNum_totalQoe[client]["qoe_sum"] + addQoe + clientQoE_chunkNum_totalQoe2[client]["qoe_sum"] + addQoe2
						qoe_sum, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum), 64)
						qoe_sum_serverPush := qoe_sum + addQoe_serverPush + addQoe_serverPush2
						qoe_sum_serverPush, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum_serverPush), 64)

						countNum_Qoe["t_count"] = t_count
						countNum_Qoe["qoe_sum"] = qoe_sum
						countNum_Qoe["qoe_sum_serverPush"] = qoe_sum_serverPush
						avg, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum/t_count), 64)
						avg_serverPush, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum_serverPush/t_count), 64)
						countNum_Qoe["avg"] = avg
						countNum_Qoe["avg_serverPush"] = avg_serverPush
						clientQoE_chunkNum_totalQoe_final[client] = countNum_Qoe

						additional_countNum_Qoe := make(map[string]float64) //additional为第二段的运动模型单独拆开，记录为新的client
						addtional_t_count := clientQoE_chunkNum_totalQoe2[client]["t_count"] + addChunk2
						addtional_qoe_sum := clientQoE_chunkNum_totalQoe2[client]["qoe_sum"] + addQoe2
						addtional_qoe_sum, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", addtional_qoe_sum), 64)
						addtional_qoe_sum_serverPush := addtional_qoe_sum + addQoe_serverPush2
						addtional_qoe_sum_serverPush, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", addtional_qoe_sum_serverPush), 64)
						additional_countNum_Qoe["t_count"] = addtional_t_count
						additional_countNum_Qoe["qoe_sum"] = addtional_qoe_sum
						additional_countNum_Qoe["qoe_sum_serverPush"] = addtional_qoe_sum_serverPush
						addtional_avg, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", addtional_qoe_sum/addtional_t_count), 64)
						addtional_avg_serverPush, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", addtional_qoe_sum_serverPush/addtional_t_count), 64)
						additional_countNum_Qoe["avg"] = addtional_avg
						additional_countNum_Qoe["avg_serverPush"] = addtional_avg_serverPush

						if client == "ppd001" {
							clientQoE_chunkNum_totalQoe_final["client11"] = additional_countNum_Qoe
						}
						if client == "ppd004" {
							clientQoE_chunkNum_totalQoe_final["client12"] = additional_countNum_Qoe
						}
						if client == "ppd007" {
							clientQoE_chunkNum_totalQoe_final["client13"] = additional_countNum_Qoe
						}
						if client == "ppd0010" {
							clientQoE_chunkNum_totalQoe_final["client14"] = additional_countNum_Qoe
						}
						if client == "ppd0013" {
							clientQoE_chunkNum_totalQoe_final["client15"] = additional_countNum_Qoe
						}

					}
				}
				/*   计算 第一组client的最终qoe 结束   */

				/*   计算 第二组client的最终qoe   */
				for client := range clientQoE_chunkNum_totalQoe3 {
					if client == "ppd002" || client == "ppd005" || client == "ppd008" || client == "ppd0011" || client == "ppd0014" {
						addChunk := lastBuffer3[client] / 4.0
						addChunk, _ = strconv.ParseFloat(fmt.Sprintf("%.0f", addChunk), 64) // 取整
						var addQoe float64
						var addQoe_serverPush float64
						if addChunk >= 17 {
							addChunk = 17
							addQoe = lastBitrate3[client]*addChunk - beta*(0-lastBuffer3[client])*addChunk/2 //CurrentBitrate - 20*(DownloadTime-BufferTime) - 0.1*smoothness
						} else {
							addQoe = lastBitrate3[client]*addChunk - beta*(0-lastBuffer3[client])*addChunk/2 //CurrentBitrate - 20*(DownloadTime-BufferTime) - 0.1*smoothness
							addQoe_serverPush = (lastBitrate3[client]/2 + beta*(40-lastBuffer3[client])) * (17 - addChunk)
							addChunk = 17
						}

						countNum_Qoe := make(map[string]float64)
						t_count := clientQoE_chunkNum_totalQoe3[client]["t_count"] + addChunk + clientQoE_chunkNum_totalQoe4[client]["t_count"]
						qoe_sum := clientQoE_chunkNum_totalQoe3[client]["qoe_sum"] + addQoe + clientQoE_chunkNum_totalQoe4[client]["qoe_sum"]
						qoe_sum, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum), 64)
						qoe_sum_serverPush := qoe_sum + addQoe_serverPush
						qoe_sum_serverPush, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum_serverPush), 64)

						countNum_Qoe["t_count"] = t_count
						countNum_Qoe["qoe_sum"] = qoe_sum
						countNum_Qoe["qoe_sum_serverPush"] = qoe_sum_serverPush
						avg, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum/t_count), 64)
						countNum_Qoe["avg"] = avg
						avg_serverPush, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", qoe_sum_serverPush/t_count), 64)
						countNum_Qoe["avg_serverPush"] = avg_serverPush

						clientQoE_chunkNum_totalQoe_final[client] = countNum_Qoe

					}
				}
				/*   计算 第二组client的最终qoe 结束   */

				// for client := range clientQoE_chunk {
				// 	fmt.Println("client_chunk:", client, "qoe:", clientQoE_chunk[client])
				// }

				fmt.Println(clientQoE_avg)
				fmt.Println("chunk:", clientQoE_avg_chunk)

				fmt.Println("----------------------------------")
				fmt.Println("utility beta=20")
				fmt.Println(label, " beta=", beta)
				// fmt.Println("clientQoE_chunkNum_totalQoe_final", clientQoE_chunkNum_totalQoe_final)
				// fmt.Println("clientQoE_chunkNum_totalQoe:", clientQoE_chunkNum_totalQoe)
				// fmt.Println("clientQoE_chunkNum_totalQoe2:", clientQoE_chunkNum_totalQoe2)
				// fmt.Println("clientQoE_chunkNum_totalQoe3:", clientQoE_chunkNum_totalQoe3)
				// fmt.Println("clientQoE_chunkNum_totalQoe4:", clientQoE_chunkNum_totalQoe4)
				fmt.Println("lastBuffer:", lastBuffer)
				fmt.Println("lastBitrate:", lastBitrate)
				fmt.Println("lastBuffer2:", lastBuffer2)
				fmt.Println("lastBitrate2:", lastBitrate2)
				fmt.Println("lastBuffer3:", lastBuffer3)
				fmt.Println("lastBitrate3:", lastBitrate3)
				fmt.Println("----------------------------------")
				fmt.Println("----------------------------------")
				// for client := range clientQoE_chunkNum_totalQoe_final {
				// 	fmt.Println(client, "qoe_avg:", clientQoE_chunkNum_totalQoe_final[client]["avg"],
				// 		"qoe_sum:", clientQoE_chunkNum_totalQoe_final[client]["qoe_sum"],
				// 		"t_count:", clientQoE_chunkNum_totalQoe_final[client]["t_count"])
				// }
				// fmt.Println("weightP_C1:", weightP_C1)
				// fmt.Println("buffer_C1:", buffer_C1)
				// fmt.Println("bitrateReq_C1:", bitrateReq_C1)
				// fmt.Println("weightP_C4:", weightP_C4)
				// fmt.Println("buffer_C4:", buffer_C4)
				// fmt.Println("bitrateReq_C4:", bitrateReq_C4)
				// fmt.Println("weightP_C2:", weightP_C2)
				// fmt.Println("buffer_C2:", buffer_C2)
				// fmt.Println("bitrateReq_C2:", bitrateReq_C2)
				// fmt.Println("weightP_C3:", weightP_C3)
				// fmt.Println("buffer_C3:", buffer_C3)
				// fmt.Println("bitrateReq_C3:", bitrateReq_C3)
				// fmt.Println("C1_info:", C1_info)
				// fmt.Println("C4_info:", C4_info)
				// fmt.Println("C2_info:", C2_info)
				// fmt.Println("C3_info:", C3_info)

				fmt.Println("----------------------------------")
				avg_qoe_total := 0.0
				avg_qoe_total_serverPush := 0.0
				clientNum := 0.0
				if label == "Vsim" {
					for client := range clientQoE_chunkNum_totalQoe_final {
						fmt.Println(client, "avg/SP:", clientQoE_chunkNum_totalQoe_final[client]["avg"], "/", clientQoE_chunkNum_totalQoe_final[client]["avg_serverPush"],
							"qoe_sum/SP:", clientQoE_chunkNum_totalQoe_final[client]["qoe_sum"], "/", clientQoE_chunkNum_totalQoe_final[client]["qoe_sum_serverPush"],
							"t_count:", clientQoE_chunkNum_totalQoe_final[client]["t_count"])
						avg_qoe_total = avg_qoe_total + clientQoE_chunkNum_totalQoe_final[client]["avg"]

						_, ok := clientQoE_chunkNum_totalQoe_final[client]["avg_serverPush"]
						if ok {
							avg_qoe_total_serverPush = avg_qoe_total_serverPush + clientQoE_chunkNum_totalQoe_final[client]["avg_serverPush"]
						} else {
							avg_qoe_total_serverPush = avg_qoe_total_serverPush + clientQoE_chunkNum_totalQoe_final[client]["avg"]
						}
						clientNum = clientNum + 1
					}
					avg_qoe_total, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", avg_qoe_total/clientNum), 64)
					fmt.Println("avg_qoe_total:", avg_qoe_total, "clientNum", clientNum)
					avg_qoe_total_serverPush, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", avg_qoe_total_serverPush/clientNum), 64)
					fmt.Println("avg_qoe_total_SP:", avg_qoe_total_serverPush, "clientNum", clientNum)
				}
				if label == "Cubic" {
					for client := range clientQoE_chunkNum_totalQoe_final {
						fmt.Println(client, "avg:", clientQoE_chunkNum_totalQoe_final[client]["avg"],
							"qoe_sum:", clientQoE_chunkNum_totalQoe_final[client]["qoe_sum"],
							"t_count:", clientQoE_chunkNum_totalQoe_final[client]["t_count"])
						avg_qoe_total = avg_qoe_total + clientQoE_chunkNum_totalQoe_final[client]["avg"]
						clientNum = clientNum + 1
					}
					avg_qoe_total, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", avg_qoe_total/clientNum), 64)
					fmt.Println("avg_qoe_total:", avg_qoe_total, "clientNum", clientNum)

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

			// if req_data_map["did"] == "ppd001" {
			// 	t, _ := strconv.ParseFloat(fmt.Sprintf("%.0f", Timer_global), 64)
			// 	buffer, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", BufferTime), 64)
			// 	bitrate, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", CurrentBitrate), 64)
			// 	buffer_C1[t] = buffer
			// 	bitrateReq_C1[t] = bitrate
			// 	info_detail["buffer"] = buffer
			// 	info_detail["bitrate"] = bitrate
			// 	C1_info[t] = info_detail
			// }
			// if req_data_map["did"] == "ppd002" {
			// 	t, _ := strconv.ParseFloat(fmt.Sprintf("%.0f", Timer_global), 64)
			// 	buffer, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", BufferTime), 64)
			// 	bitrate, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", CurrentBitrate), 64)
			// 	buffer_C2[t] = buffer
			// 	bitrateReq_C2[t] = bitrate
			// 	info_detail["buffer"] = buffer
			// 	info_detail["bitrate"] = bitrate
			// 	C2_info[t] = info_detail
			// }
			// if req_data_map["did"] == "ppd003" {
			// 	t, _ := strconv.ParseFloat(fmt.Sprintf("%.0f", Timer_global), 64)
			// 	buffer, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", BufferTime), 64)
			// 	bitrate, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", CurrentBitrate), 64)
			// 	buffer_C3[t] = buffer
			// 	bitrateReq_C3[t] = bitrate
			// 	info_detail["buffer"] = buffer
			// 	info_detail["bitrate"] = bitrate
			// 	C3_info[t] = info_detail
			// }
			// if req_data_map["did"] == "ppd004" {
			// 	t, _ := strconv.ParseFloat(fmt.Sprintf("%.0f", Timer_global), 64)
			// 	buffer, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", BufferTime), 64)
			// 	bitrate, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", CurrentBitrate), 64)
			// 	buffer_C4[t] = buffer
			// 	bitrateReq_C4[t] = bitrate
			// 	info_detail["buffer"] = buffer
			// 	info_detail["bitrate"] = bitrate
			// 	C4_info[t] = info_detail
			// }

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
		// fmt.Println("weightInfo:\n", weightInfo)

		timer1 := Timer_global / 4.0 //每4秒更新weight
		timer1, _ = strconv.ParseFloat(fmt.Sprintf("%.0f", timer1), 64)
		fmt.Println("timer1:", timer1)

		if timer1 >= updateWeightTime {
			updateWeightTime = updateWeightTime + 1
			fmt.Println("updateWeightTime:", updateWeightTime)
			for c, _ := range updateWeightFlag { //把所有用户flag置为true
				updateWeightFlag[c] = true
			}
		}
		for c, flag := range updateWeightFlag {
			if flag == true {
				//update weight for each client
				// fmt.Println(c, "update")
				for c, weight := range weightInfo {
					if weight < (weightSum/clientNum)*0.6 {
						weightInfo_new[c] = (weightSum / clientNum) * 0.6
					} else {
						weightInfo_new[c] = weight
					}
				}

				updateWeightFlag[c] = false
			}
		}

		// if req_data_map["did"] == "ppd003" {
		// fmt.Println("weightInfo_new:\n", weightInfo_new)
		// }
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
		// bandwidth_default := float64(1024*768) / 6 * 25
		var bandwidth_default = float64(1024*768) / 6 * 2.5
		var bandwidth_total float64
		var bandwidth_r = 0.0
		if clientNum != 0.0 {
			bandwidth_total = bandwidth_default * clientNum
			// bandwidth_r = bandwidth_default / clientNum //in Byte (1024*768 = 6 Mbps)
		} else {
			bandwidth_r = bandwidth_default //in Byte (1024*768 = 6 Mbps)
		}
		// bandwidth_r := bandwidth_default * 2 / 18 //in Byte (1024*768 = 6 Mbps)

		if bandwidth_r == 0.0 {
			bandwidth_r = bandwidth_default
		}
		for clientName, weight := range weightInfo_new {
			// bandwidth_r = float64(bandwidth_r) * weight / weightSum
			weightPercentage := weight / weightSum_new
			wp, _ := strconv.ParseFloat(fmt.Sprintf("%.3f", weightPercentage), 64)
			weightInfo_p[clientName] = wp
			// if clientName == "ppd001" {
			// 	t, _ := strconv.ParseFloat(fmt.Sprintf("%.0f", Timer_global), 64)
			// 	w, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", weightPercentage), 64)
			// 	weightP_C1[t] = w
			// 	info_detail["weightP"] = w
			// 	C1_info[t] = info_detail
			// }
			// if clientName == "ppd002" {
			// 	t, _ := strconv.ParseFloat(fmt.Sprintf("%.0f", Timer_global), 64)
			// 	w, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", weightPercentage), 64)
			// 	weightP_C2[t] = w
			// 	info_detail["weightP"] = w
			// 	C2_info[t] = info_detail
			// }
			// if clientName == "ppd003" {
			// 	t, _ := strconv.ParseFloat(fmt.Sprintf("%.0f", Timer_global), 64)
			// 	w, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", weightPercentage), 64)
			// 	weightP_C3[t] = w
			// 	info_detail["weightP"] = w
			// 	C3_info[t] = info_detail
			// }
			// if clientName == "ppd004" {
			// 	t, _ := strconv.ParseFloat(fmt.Sprintf("%.0f", Timer_global), 64)
			// 	w, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", weightPercentage), 64)
			// 	weightP_C4[t] = w
			// 	info_detail["weightP"] = w
			// 	C4_info[t] = info_detail
			// }

			bandwidth_r = bandwidth_total * weightPercentage
			label = "Vsim"

			// bandwidth_r = bandwidth_total / clientNum
			// label = "Cubic"

			// if req_data_map["did"] == "ppd003" {
			// 	fmt.Println(clientName, "Timer:", Timer_global, "bandwidth:", bandwidth_r, "weightPercentage:", weightPercentage, "\n")
			// }
			// fmt.Println("u1_avg_after:", u1_avg_after, "u2_avg_after:", u2_avg_after)
		}
		fmt.Println("weightInfo_p:", weightInfo_p)

		// if Timer_global > 20 {
		// 	delete(weightInfo, "ppd001")
		// 	delete(weightInfo_new, "ppd001")
		// 	clientNum = clientNum - 1
		// 	bandwidth_r = 1
		// }

		if strings.Contains(fmt.Sprintf(r.URL.Path[1:]), "media") {

			fmt.Println(Timer_global)
			// fmt.Printf("Hello %s\n", r.URL.Path[1:])
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
			// fmt.Printf("File_Size %s\n", fmt.Sprint(fi.Size()))

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

					// bitrate_f, _ := strconv.ParseFloat(bitrate_s, 64)
					// fmt.Printf("Bitrate %f Kbps\n", bitrate_f/(1024))
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
