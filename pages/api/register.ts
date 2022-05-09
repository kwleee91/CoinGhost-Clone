import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const { body } = req;

            if (body.auth === "333333") {
                res.status(200).json({ data: { message: true } });
            } else {
                res.status(400).json({ data: { message: "인증번호가 틀렸습니다. 다시 시도해 주세요." } });
            }
        }
    } catch (e) {
        res.status(500).json({ message: e?.data?.message });
    }
};