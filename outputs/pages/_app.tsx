import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Atlas · Personalized Robot Learning Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Atlas pairs Bayesian knowledge tracing with conversational AI — a tutor that learns the way you learn."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
