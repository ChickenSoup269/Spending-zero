// "use client"

// import { useEffect, useState } from "react"
// import axios from "axios"
// import { ChartContainer } from "@/components/ui/chart"
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// interface GoldPrice {
//   name: string
//   buyPrice: number
//   sellPrice: number
//   date: string
// }

// export default function GoldPricePage() {
//   const [goldData, setGoldData] = useState<GoldPrice[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchGoldPrices = async () => {
//       try {
//         const response = await axios.get("/api/gold") // Gọi API từ server
//         console.log("API Response:", response.data)

//         // Kiểm tra nếu response có lỗi
//         if (!response.data) {
//           throw new Error("API không trả về dữ liệu")
//         }

//         // Parse XML thành Document Object Model
//         const parser = new DOMParser()
//         const xmlDoc = parser.parseFromString(response.data, "text/xml")

//         // Kiểm tra nếu XML có lỗi
//         if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
//           throw new Error("Lỗi khi parse XML, dữ liệu có thể không hợp lệ")
//         }

//         const dataNodes = xmlDoc.getElementsByTagName("Data")
//         console.log("Number of Data nodes:", dataNodes.length) // Debug số lượng node

//         if (dataNodes.length === 0) {
//           throw new Error("Không tìm thấy dữ liệu trong XML")
//         }

//         const parsedData = Array.from(dataNodes).map((node) => {
//           const row = node.getAttribute("row")
//           const name = node.getAttribute(`n_${row}`) || "Unknown"
//           const buyPrice = parseInt(node.getAttribute(`pb_${row}`) || "0", 10)
//           const sellPrice = parseInt(node.getAttribute(`ps_${row}`) || "0", 10)
//           const date = node.getAttribute(`d_${row}`) || "N/A"

//           return { name, buyPrice, sellPrice, date }
//         })

//         console.log("Parsed data:", parsedData) // Debug dữ liệu đã parse

//         // Lọc dữ liệu có tên chứa "Bản"
//         const filteredData = parsedData.filter((item) =>
//           item.name.includes("Bản")
//         )

//         setGoldData(filteredData.length > 0 ? filteredData : parsedData)
//       } catch (err: any) {
//         console.error("Error fetching data:", err.message)
//         setError(err.message || "Không thể tải dữ liệu giá vàng")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchGoldPrices()
//   }, [])

//   if (loading) return <div className="p-6">Đang tải...</div>
//   if (error) return <div className="p-6 text-red-500">{error}</div>
//   if (goldData.length === 0)
//     return <div className="p-6">Không có dữ liệu giá vàng</div>

//   // Chuẩn bị dữ liệu cho biểu đồ
//   const chartData = goldData.map((item) => ({
//     name: item.name.split(" (")[0], // Lấy tên ngắn gọn
//     buyPrice: item.buyPrice,
//     sellPrice: item.sellPrice,
//   }))

//   const chartConfig = {
//     buyPrice: {
//       label: "Giá mua",
//       color: "#2563eb",
//     },
//     sellPrice: {
//       label: "Giá bán",
//       color: "#f97316",
//     },
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Giá vàng - Bản</h1>

//       <ChartContainer config={chartConfig} className="mb-8">
//         <BarChart width={600} height={400} data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
//           <YAxis
//             tickFormatter={(value) => (value / 1000000).toFixed(1) + "M"}
//           />
//           <Tooltip
//             formatter={(value) => value.toLocaleString() + " VND"}
//             labelFormatter={(label) => `Loại vàng: ${label}`}
//           />
//           <Legend />
//           <Bar
//             dataKey="buyPrice"
//             fill={chartConfig.buyPrice.color}
//             name={chartConfig.buyPrice.label}
//           />
//           <Bar
//             dataKey="sellPrice"
//             fill={chartConfig.sellPrice.color}
//             name={chartConfig.sellPrice.label}
//           />
//         </BarChart>
//       </ChartContainer>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Tên loại vàng</TableHead>
//             <TableHead>Giá mua (VND)</TableHead>
//             <TableHead>Giá bán (VND)</TableHead>
//             <TableHead>Thời gian cập nhật</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {goldData.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>{item.name}</TableCell>
//               <TableCell>{item.buyPrice.toLocaleString()}</TableCell>
//               <TableCell>
//                 {item.sellPrice === 0
//                   ? "Không bán"
//                   : item.sellPrice.toLocaleString()}
//               </TableCell>
//               <TableCell>{item.date}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function GoldTestPage() {
  const [data, setData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGoldPrices = async () => {
      try {
        const response = await axios.get(
          "http://giavang.doji.vn/api/giavang/?api_key=258fbd2a72ce8481089d88c678e9fe4f"
        )
        console.log("API Response:", response.data)
        setData(response.data) // Lưu dữ liệu vào state
      } catch (err: any) {
        console.error("Lỗi khi gọi API:", err.message)
        setError(err.message)
      }
    }

    fetchGoldPrices() // ⚠️ GỌI HÀM Ở ĐÂY
  }, []) // Chạy một lần khi component mount

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Test API Giá Vàng</h1>
      {error && <p className="text-red-500">Lỗi: {error}</p>}
      {data ? (
        <pre className="bg-gray-100 p-4 rounded">{data}</pre>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  )
}
