import { CacheProvider, EmotionCache } from "@emotion/react";
import { AuthContextProvider, buildClient, createEmotionCache } from "@lib";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@styles/theme";
import { CurrentUser } from "@types";
import { NextPageWithLayout } from "next";
import { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ReactElement } from "react";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  currentUser: CurrentUser["currentUser"];
  emotionCache?: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  pageProps,
  currentUser,
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

        <AuthContextProvider currentUser={currentUser}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <RecoilRoot>
              {getLayout(
                <Component currentUser={currentUser} {...pageProps} />
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
          </ThemeProvider>
        </AuthContextProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const client = buildClient(appContext.ctx);
//   const {
//     data: { currentUser },
//   } = await client.get<CurrentUser>("/auth/current/user");
//   console.log("currentUser", currentUser);

//   let pageProps = {};
//   if (appContext.Component.getInitialProps)
//     pageProps = await appContext.Component.getInitialProps({
//       ...appContext.ctx,
//       client,
//       currentUser,
//     });

//   return {
//     pageProps,
//     currentUser,
//   };
// };
