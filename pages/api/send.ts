import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

import { TrackRecommendation } from "./recommendations";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const PHONE_NUMBER = process.env.PHONE_NUMBER;
const APP_KEY = process.env.APP_KEY;

const dev = process.env.NODE_ENV === "development";

const url = dev
  ? process.env.LOCAL_RECOMMENDATIONS_ENDPOINT!
  : process.env.PROD_RECOMMENDATIONS_ENDPOINT!;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  region: "us1",
  edge: "ashburn",
});

const format = (trackRecommendations: TrackRecommendation[]) => {
  let body = `\nGood morning, Quinn ☀️\n
Here are your track recommendations for today: \n
`;

  trackRecommendations.map(({ title, artist, link }, idx) => {
    body += `${title} by ${artist}: ${link}`;
    idx !== trackRecommendations.length - 1 && (body += "\n\n");
  });

  return body;
};

const sendMessage = async (recommendations: TrackRecommendation[]) =>
  await client.messages.create({
    to: PHONE_NUMBER!,
    from: TWILIO_PHONE_NUMBER!,
    body: format(recommendations),
  });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.headers.authorization?.split(" ")[1] || undefined;
  const recommendationsResponse = await fetch(url);

  const recommendations: TrackRecommendation[] =
    await recommendationsResponse.json();

  switch (req.method) {
    case "POST":
      if (key !== undefined && key === APP_KEY) {
        await sendMessage(recommendations);
        res.status(200).json({ message: "Recommendations delivered" });
        break;
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
