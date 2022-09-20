import { NextApiRequest, NextApiResponse } from "next";

import { getSavedTracks, getRecommendations } from "../../lib/spotify";

import { handleFetchError } from "../../util/handleFetchError";

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
  const { status: savedTracksResponseStatus } = savedTracksResponse;

  if (savedTracksResponseStatus !== 200) {
    handleFetchError(
      savedTracksResponseStatus,
      res,
      "Error: failed to fetch saved tracks"
    );
  }

  const { items } = await savedTracksResponse.json();

  const results = items.map(({ track: { id } }: Item) => ({ id }));

  const seedTrackIDs: string = results
    .map(({ id }: Item["track"]) => id)
    .toString();

  const recommendationsResponse = await getRecommendations(seedTrackIDs);
  const { status: recommendationsResponseStatus } = recommendationsResponse;

  if (recommendationsResponseStatus !== 200) {
    handleFetchError(
      recommendationsResponseStatus,
      res,
      "Error: failed to fetch recommended tracks"
    );
  }

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

  return res.status(200).json(recommendations);
};

export default handler;
