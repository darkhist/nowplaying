import { NextApiRequest, NextApiResponse } from "next";

import { TrackRecommendation } from "./recommendations";

import { handleFetchError } from "../../util/handleFetchError";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const APP_KEY = process.env.APP_KEY;

import twilio from "twilio";

const dev = process.env.NODE_ENV === "development";

const url = dev
  ? process.env.LOCAL_RECOMMENDATIONS_ENDPOINT!
  : process.env.PROD_RECOMMENDATIONS_ENDPOINT!;

const format = (trackRecommendations: TrackRecommendation[]) => {
  let body = `\nGood morning, Quinn ☀️
Here are your track recommendations for today:
`;

  trackRecommendations.map(({ title, artist, link }, idx) => {
    body += `${title} by ${artist}: ${link}`;
    idx !== trackRecommendations.length - 1 && (body += "\n");
  });

  return body;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.headers.authorization?.split(" ")[1] || undefined;

  const recommendationsResponse = await fetch(url);
  const { status } = recommendationsResponse;

  if (status !== 200) {
    handleFetchError(
      status,
      res,
      "Error: failed to fetch /api/recommendations"
    );
  }

  const recommendations: TrackRecommendation[] =
    await recommendationsResponse.json();

  try {
    if (key !== APP_KEY || key === undefined) {
      res.status(403).json({ msg: "Forbidden" });
    } else {
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
        region: "us1",
        edge: "ashburn",
      });
      client.messages.create({
        to: process.env.PHONE_NUMBER!,
        from: process.env.TWILIO_PHONE_NUMBER!,
        body: format(recommendations),
      });
      res.status(200).json({ msg: "Recommendations Delivered 🎉" });
    }
  } catch (err) {
    res.status(500);
  }
};

export default handler;
