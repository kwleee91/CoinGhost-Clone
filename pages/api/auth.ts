import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { body } = req;

      if (body.phone === "010-1234-5678") {
        res.status(200).json({ data: { message: "333333" } });
      } else {
        res
          .status(400)
          .json({ data: { message: "형식에 맞지 않는 번호입니다." } });
      }
    }
  } catch (e) {
    res.status(500).json({ message: e?.data?.message });
  }
};
