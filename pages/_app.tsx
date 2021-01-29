import "../src/styles/globals.scss";
import React from "react";
import { Header } from "../src/components";
import "typeface-montserrat";
import Head from "next/head";
import { Footer } from "../src/components/footer.component";
import type { AppComponent } from "next/dist/next-server/lib/router/router";
import { Provider } from "next-auth/client";

const MyApp: AppComponent = ({ Component, pageProps }) => (
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

export default MyApp;
