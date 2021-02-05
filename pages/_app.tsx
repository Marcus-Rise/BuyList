import "../src/styles/globals.scss";
import React, { useEffect } from "react";
import { Header } from "../src/components";
import "typeface-montserrat";
import Head from "next/head";
import { Footer } from "../src/components/footer.component";
import type { AppComponent } from "next/dist/next-server/lib/router/router";
import { Provider } from "next-auth/client";
import { useInject } from "../src/ioc";
import type { IAuthService } from "../src/auth";
import { AUTH_SERVICE_PROVIDER } from "../src/auth";

const MyApp: AppComponent = ({ Component, pageProps }) => {
  const authService = useInject<IAuthService>(AUTH_SERVICE_PROVIDER);

  useEffect(() => {
    authService.session = pageProps.session;
  }, [authService, pageProps.session]);

  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>BuyList</title>
      </Head>
      <Header appName={"BuyList"} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer year={new Date().getFullYear()} author={"Ilya Konstantinov"} authorLink={"https://marcus-rise.dev"} />
    </Provider>
  );
};

export default MyApp;
