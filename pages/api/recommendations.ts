import { NextApiRequest, NextApiResponse } from "next";

import { getSavedTracks, getRecommendations } from "../../lib/spotify";

interface Item {
  track: {
    id: string;
  };
}

interface SpotifyTrackRecommendation {
  name: string;
  external_urls: {
    spotify: string;
  };
  artists: {
    name: string;
  }[];
}

export interface TrackRecommendation {
  title: string;
  artist: string;
  link: string;
}

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const savedTracksResponse = await getSavedTracks();
  const { items } = await savedTracksResponse.json();

  const results = items.map(({ track: { id } }: Item) => ({ id }));

  const seedTrackIDs: string = results
    .map(({ id }: Item["track"]) => id)
    .toString();

  const recommendationsResponse = await getRecommendations(seedTrackIDs);
  const { tracks } = await recommendationsResponse.json();

  const recommendations: TrackRecommendation[] = tracks.map(
    ({
      name: trackTitle,
      artists,
      external_urls: { spotify },
    }: SpotifyTrackRecommendation) => ({
      title: trackTitle,
      artist: artists[0].name,
      link: spotify,
    })
  );

  res.status(200).json(recommendations);
};

export default handler;
