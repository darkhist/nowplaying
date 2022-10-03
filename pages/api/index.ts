import type { NextApiRequest, NextApiResponse } from "next";

export interface Response {
  message: string;
}

const handler = (_: NextApiRequest, res: NextApiResponse<Response>) => {
  res.status(403).json({ message: "Forbidden" });
};

export default handler;
