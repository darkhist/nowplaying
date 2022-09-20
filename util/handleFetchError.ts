import { NextApiResponse } from "next";

export const handleFetchError = (
  status: Response["status"],
  res: NextApiResponse,
  message: string
) => res.status(status).json(message);
