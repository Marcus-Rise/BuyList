import "../src/styles/globals.scss";
import React, { useMemo } from "react";
import { Footer, Header } from "../src/components";
import "typeface-montserrat";
import Head from "next/head";
import type { AppComponent } from "next/dist/next-server/lib/router/router";
import { Provider } from "next-auth/client";

const MyApp: AppComponent = ({ Component, pageProps }) => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>BuyList</title>
      </Head>
      <Header appName={"BuyList"} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer year={year} author={"Ilya Konstantinov"} authorLink={"https://marcus-rise.dev"} />
    </Provider>
  );
};

export default MyApp;
