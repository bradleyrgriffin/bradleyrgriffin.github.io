// Filename - pages/_app.js

import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { theme } from '../theme';
import createEmotionCache from '../createEmotionCache';
import { AppProps } from 'next/app';
import { Header } from '../components/molecules/Header';
import { Footer } from '../components/molecules/Footer';
import { DefaultSeo } from 'next-seo';
import SEO from '../seo.config';

// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, 
                    width=device-width"
        />
        <title>Brad Griffin, Professional</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Header />

        <CssBaseline />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
