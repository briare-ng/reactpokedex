import "../styles/globals.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>P O K E D E X with React</title>
        <link rel="icon" sizes="32x32" href="favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          property="og:title"
          content="Un pokedex"
          key="title"
        />
        <meta name="description" content="Un pokedex fait à partir de l'API Rest PokeApi.co"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
