import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="description"
        content="Personalized Spotify track recommendations sent to you every morning"
      />
      <meta
        name="keywords"
        content="music, discovery, playlist, Spotify, SMS"
      />
      <meta name="author" content="Quinn Salas" />
      <link rel="icon" href="/favicon.svg" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
