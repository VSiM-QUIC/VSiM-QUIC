package main

import (
	"fmt"
	"strconv"
)

func main() {
	// temp := 21
	clientQoE_chunk := make(map[string]float64)
	clientQoE_chunk["ppd001"] = 123.3
	clientQoE_chunk["ppd002"] = 1234.3
	mod := 90 / (150.0 / 260.0)
	mod, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", mod), 64)
	mod2 := 130 / (150.0 / 260.0)
	mod2, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", mod2), 64)
	fmt.Println(clientQoE_chunk)
	delete(clientQoE_chunk, "ppd001")
	fmt.Println(clientQoE_chunk)
	delete(clientQoE_chunk, "ppd001")
	fmt.Println(clientQoE_chunk)

	fmt.Println(mod, mod2)

}

cubic
ppd001 qoe_avg: 933.07 qoe_sum: 69980.29 t_count: 75
ppd004 qoe_avg: 1179.98 qoe_sum: 76698.83 t_count: 65
ppd007 qoe_avg: 1080.89 qoe_sum: 82147.74 t_count: 76
ppd0010 qoe_avg: 1061.72 qoe_sum: 71135.18 t_count: 67
ppd002 qoe_avg: 1803.32 qoe_sum: 120822.71 t_count: 67
ppd005 qoe_avg: 928.17 qoe_sum: 70540.6 t_count: 76
ppd008 qoe_avg: 1703 qoe_sum: 108992.16 t_count: 64
ppd003 qoe_avg: 1939.47 qoe_sum: 128005.14 t_count: 66
ppd006 qoe_avg: 2314.84 qoe_sum: 150464.7 t_count: 65
ppd009 qoe_avg: 2420.3 qoe_sum: 152479.06 t_count: 63


cubic02
ppd001 qoe_avg: 1341.12 qoe_sum: 88513.91 t_count: 66
ppd004 qoe_avg: 1172.76 qoe_sum: 80920.34 t_count: 69
ppd007 qoe_avg: 1540.08 qoe_sum: 103185.4 t_count: 67
ppd0010 qoe_avg: 1293.3 qoe_sum: 86650.83 t_count: 67
ppd002 qoe_avg: 1663.06 qoe_sum: 113088.06 t_count: 68
ppd005 qoe_avg: 1602.96 qoe_sum: 104192.71 t_count: 65
ppd008 qoe_avg: 1835.1 qoe_sum: 135797.29 t_count: 74
ppd003 qoe_avg: 2556.65 qoe_sum: 166182.08 t_count: 65
ppd006 qoe_avg: 2353.34 qoe_sum: 148260.64 t_count: 63
ppd009 qoe_avg: 2296.03 qoe_sum: 146945.64 t_count: 64


vsim
ppd001 qoe_avg: 990.01 qoe_sum: 66330.97 t_count: 67
ppd004 qoe_avg: 1281.32 qoe_sum: 82004.36 t_count: 64
ppd007 qoe_avg: 1209.59 qoe_sum: 74994.69 t_count: 62
ppd0010 qoe_avg: 1018.78 qoe_sum: 60108.01 t_count: 59
ppd002 qoe_avg: 1642.17 qoe_sum: 121520.8 t_count: 74
ppd005 qoe_avg: 1868.46 qoe_sum: 138266.21 t_count: 74
ppd008 qoe_avg: 1387.2 qoe_sum: 87393.7 t_count: 63
ppd003 qoe_avg: 2137.01 qoe_sum: 156001.56 t_count: 73
ppd006 qoe_avg: 2249.54 qoe_sum: 148469.56 t_count: 66
ppd009 qoe_avg: 2409.57 qoe_sum: 151802.9 t_count: 63


vsim02
ppd001 qoe_avg: 1585.84 qoe_sum: 101493.48 t_count: 64
ppd004 qoe_avg: 1199.69 qoe_sum: 85177.71 t_count: 71
ppd007 qoe_avg: 1430.55 qoe_sum: 92985.44 t_count: 65
ppd0010 qoe_avg: 1330.22 qoe_sum: 99766.66 t_count: 75
ppd002 qoe_avg: 1852.65 qoe_sum: 127832.77 t_count: 69
ppd005 qoe_avg: 1778.17 qoe_sum: 126249.89 t_count: 71
ppd008 qoe_avg: 1561.59 qoe_sum: 93695.65 t_count: 60
ppd003 qoe_avg: 1600.14 qoe_sum: 115210.1 t_count: 72
ppd006 qoe_avg: 2748.19 qoe_sum: 175884.28 t_count: 64
ppd009 qoe_avg: 2944.21 qoe_sum: 200206 t_count: 68

vsim03
ppd001 qoe_avg: 1106.32 qoe_sum: 66378.96 t_count: 60
ppd004 qoe_avg: 1421.38 qoe_sum: 100918.14 t_count: 71
ppd0010 qoe_avg: 1101.58 qoe_sum: 74907.34 t_count: 68
ppd007 qoe_avg: 1142.07 qoe_sum: 81086.82 t_count: 71
ppd002 qoe_avg: 1670.43 qoe_sum: 108578.1 t_count: 65
ppd005 qoe_avg: 1756.81 qoe_sum: 112435.94 t_count: 64
ppd008 qoe_avg: 1278.46 qoe_sum: 83100.12 t_count: 65
ppd003 qoe_avg: 2694.33 qoe_sum: 177825.58 t_count: 66
ppd006 qoe_avg: 2386.49 qoe_sum: 145575.92 t_count: 61
ppd009 qoe_avg: 2486.15 qoe_sum: 159113.9 t_count: 64

