import { Authorization } from "@components";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { PermissionsContextProvider, createEmotionCache } from "@lib";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { theme } from "@styles/theme";
import { NextPageWithLayout } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={(pageProps as any).session}>
      <PermissionsContextProvider>
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
                    {getLayout(<Component {...pageProps} />)}
                  </Authorization>
                ) : (
                  getLayout(<Component {...pageProps} />)
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
      </PermissionsContextProvider>
    </SessionProvider>
  );
}
