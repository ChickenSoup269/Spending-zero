import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      "https://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v"
    )

    res.status(200).json({ data: response.data })
  } catch (error: any) {
    console.error(
      "Lỗi khi gọi API BTMC:",
      error.response?.status,
      error.message
    )
    res
      .status(error.response?.status || 500)
      .json({ message: "Không thể lấy dữ liệu giá vàng" })
  }
}
