import type { NextApiRequest, NextApiResponse } from "next";

interface Response {
  msg: string;
}

const handler = (_: NextApiRequest, res: NextApiResponse<Response>) => {
  res.status(403).json({ msg: "Forbidden" });
};

export default handler;
