import "../src/styles/globals.scss";
import React from "react";
import { Header } from "../src/components/header.component";
import { AppProvider } from "../src/store";
import "typeface-montserrat";
import Head from "next/head";
import { Footer } from "../src/components/footer.component";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({ Component, pageProps }) => (
  <AppProvider>
    <Head>
      <title>BuyList</title>
    </Head>
    <Header appName={"BuyList"} />
    <main>
      <Component {...pageProps} />
    </main>
    <Footer year={new Date().getFullYear()} author={"Ilya Konstantinov"} authorLink={"https://marcus-rise.dev"} />
  </AppProvider>
);

export default MyApp;
