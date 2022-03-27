import { Authorization } from "@components";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { buildClient, createEmotionCache } from "@lib";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@styles/theme";
import { NextPageWithLayout } from "next";
import { Session } from "next-auth";
import { getSession, SessionProvider } from "next-auth/react";
import { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ReactElement } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RecoilRoot>
              {Component.auth ? (
                <Authorization roles={Component.auth.roles}>
                  {getLayout(<Component session={session} {...pageProps} />)}
                </Authorization>
              ) : (
                getLayout(<Component session={session} {...pageProps} />)
              )}
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
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const session = await getSession(appContext.ctx);
  const client = await buildClient(appContext.ctx);

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
