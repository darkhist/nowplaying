const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  pageExtensions: ["ts", "tsx"],
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
