import Head from "next/head";
import Image from "next/image";

import styles from "../styles/index.module.scss";

const Home = () => (
  <>
    <Head>
      <title>nowplaying</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main>
      <h1 className={styles.title}>nowplaying</h1>
      <p className={styles.subtitle}>(private beta)</p>
      <div className={styles.img}>
        <Image
          src="/images/gm.jpg"
          alt={`Screenshot of a text message with five recommended tracks from Spotify. 
          1. Hold On by Little Dragon
          2. VEDMA by Brothel
          3. I Just Am by nthng 
          4. Cigarettes Out the Window by TV Girl
          5. The Answer by David Hasert`}
          width="375"
          height="700"
          objectFit="cover"
        />
      </div>
    </main>
  </>
);

export default Home;
