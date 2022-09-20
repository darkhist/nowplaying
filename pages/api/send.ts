import { NextApiRequest, NextApiResponse } from "next";

import { TrackRecommendation } from "./recommendations";

import { handleFetchError } from "../../util/handleFetchError";

// const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
// const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

// import twilio from "twilio";

const dev = process.env.NODE_ENV === "development";

const url = dev
  ? process.env.LOCAL_RECOMMENDATIONS_ENDPOINT!
  : process.env.PROD_RECOMMENDATIONS_ENDPOINT!;

const format = (trackRecommendations: TrackRecommendation[]) => {
  // TODO: Replace with user provided name
  let body = `\nGood morning, Quinn ☀️
Here are your track recommendations for today:
`;

  trackRecommendations.map(({ title, artist, link }, idx) => {
    body += `${title} by ${artist}: ${link}`;
    idx !== trackRecommendations.length - 1 && (body += "\n");
  });

  return body;
};

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
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

  const body = format(recommendations);
  console.log(body);

  // TODO: Uncomment to send SMS
  // const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  //   region: "us1",
  //   edge: "ashburn",
  // });

  // TODO: Replace with user provided phone number
  // client.messages
  //   .create({
  //     to: process.env.PHONE_NUMBER!,
  //     from: process.env.TWILIO_PHONE_NUMBER!,
  //     body,
  //   })
  //   .then(({ status }) => console.log(`Message ${status}`));
  return res.status(200).json(body);
};

export default handler;
