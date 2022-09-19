const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

const params = new URLSearchParams();
params.append("grant_type", "refresh_token");
params.append("refresh_token", REFRESH_TOKEN);

const getAccessToken = async () => {
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  return await response.json();
};

const generateRandomOffset = () => Math.floor(Math.random() * 3200);

export const getSavedTracks = async () => {
  const { access_token } = await getAccessToken();
  const offset = generateRandomOffset();

  return fetch(
    `https://api.spotify.com/v1/me/tracks?limit=5&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getRecommendations = async (seedTracks: string) => {
  const { access_token } = await getAccessToken();

  return fetch(
    `https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=${seedTracks}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
