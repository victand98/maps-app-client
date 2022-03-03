import { CacheProvider, EmotionCache } from "@emotion/react";
import { buildClient, createEmotionCache } from "@lib";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@styles/theme";
import { NextPageWithLayout } from "next";
import { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ReactElement } from "react";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { getSession, SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
  emotionCache?: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  pageProps,
  session,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <SessionProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Ciclovia App</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
        </Head>

        <ThemeProvider theme={theme}>
          <CssBaseline />

          <RecoilRoot>
            {getLayout(<Component session={session} {...pageProps} />)}
          </RecoilRoot>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={2}
          />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx);
  const session = await getSession(appContext.ctx);

  let pageProps = {};
  if (appContext.Component.getInitialProps)
    pageProps = await appContext.Component.getInitialProps({
      ...appContext.ctx,
      client,
      session,
    });

  return {
    pageProps,
  };
};
