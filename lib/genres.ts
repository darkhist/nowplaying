// warning: unused module
// keeping this around just in case ;-)

export const generateSeedGenres = () => {
  const genres = [
    "alt-rock",
    "alternative",
    "ambient",
    "breakbeat",
    "chicago-house",
    "chill",
    "club",
    "dance",
    "dancehall",
    "deep-house",
    "detroit-techno",
    "disco",
    "drum-and-bass",
    "dub",
    "dubstep",
    "edm",
    "electro",
    "electronic",
    "emo",
    "garage",
    "groove",
    "grunge",
    "hip-hop",
    "house",
    "idm",
    "indie",
    "indie-pop",
    "industrial",
    "minimal-techno",
    "new-release",
    "party",
    "pop",
    "post-dubstep",
    "power-pop",
    "progressive-house",
    "psych-rock",
    "punk",
    "punk-rock",
    "rock",
    "rock-n-roll",
    "romance",
    "sad",
    "ska",
    "sleep",
    "synth-pop",
    "techno",
    "trance",
    "trip-hop",
    "work-out",
  ];

  return [...genres].sort(() => 0.5 - Math.random()).slice(0, 5);
};
