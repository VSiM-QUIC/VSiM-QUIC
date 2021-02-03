package main

import (
	"fmt"
	"math"
	"strconv"
)

func bitrateTrans(x float64) float64 {
	result, _ := strconv.ParseFloat(fmt.Sprintf("%.2f", 16.608*math.Log(x)-42.943), 64)
	return result
	// return 16.608*math.Log(x) - 42.943
}
func main() {

	bitrate := make(map[float64]float64)
	bitrate[45] = bitrateTrans(45)
	bitrate[88] = bitrateTrans(88)
	bitrate[128] = bitrateTrans(128)
	bitrate[177] = bitrateTrans(177)
	bitrate[217] = bitrateTrans(217)
	bitrate[255] = bitrateTrans(255)
	bitrate[323] = bitrateTrans(323)
	bitrate[378] = bitrateTrans(378)
	bitrate[509] = bitrateTrans(509)
	bitrate[577] = bitrateTrans(577)
	bitrate[782] = bitrateTrans(782)
	bitrate[1008] = bitrateTrans(1008)
	bitrate[1207] = bitrateTrans(1207)
	bitrate[1473] = bitrateTrans(1473)
	bitrate[2087] = bitrateTrans(2087)
	bitrate[2409] = bitrateTrans(2409)
	bitrate[2944] = bitrateTrans(2944)
	bitrate[3340] = bitrateTrans(3340)
	bitrate[3613] = bitrateTrans(3613)
	bitrate[3936] = bitrateTrans(3936)
	fmt.Println(bitrate)
	for b, v := range bitrate {
		fmt.Println("bitrate:", b, "value:", v)

	}

}
