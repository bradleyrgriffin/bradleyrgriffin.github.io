// Filename - pages/_app.js

import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { darkModeTheme, theme } from '../theme';
import createEmotionCache from '../createEmotionCache';
import { AppProps } from 'next/app';
import { Header } from '../components/molecules/Header';
import { Footer } from '../components/molecules/Footer';
import { DefaultSeo } from 'next-seo';
import SEO from '../seo.config';
import { UserProvider } from '../components/providers/UserProvider';
import { Drawer } from '../components/molecules/UserPopupDrawer';
import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { googleAnalyticsConfig } from '../components/constants/googleAnalytics';
// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  // Toggle the theme mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

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
      <ThemeProvider theme={darkMode ? darkModeTheme : theme}>
        <UserProvider>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <CssBaseline />
          <DefaultSeo {...SEO} />
          <GoogleAnalytics gaId={googleAnalyticsConfig.tagId} />
          <Component {...pageProps} toggleDarkMode={toggleDarkMode} />
          <Footer />
          <Drawer />
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
