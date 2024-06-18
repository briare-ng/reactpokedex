import "../styles/globals.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>P O K E D E X with React</title>
        <link rel="icon" sizes="32x32" href="favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
