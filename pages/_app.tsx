import "../src/styles/globals.scss";
import React from "react";
import { Header } from "../src/components/header.component";
import { AppProvider } from "../src/store";
import "typeface-montserrat";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({ Component, pageProps }) => (
  <AppProvider>
    <Header />
    <main>
      <Component {...pageProps} />
    </main>
  </AppProvider>
);

export default MyApp;
