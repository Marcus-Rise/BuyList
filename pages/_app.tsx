import "../src/styles/globals.scss";
import React from "react";
import { Header } from "../src/components/header.component";
import { AppProvider } from "../src/store";
import "typeface-montserrat";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({ Component, pageProps }) => (
  <div className="d-flex flex-column h-100">
    <AppProvider>
      <Header />
      <main role="main" className="flex-shrink-0">
        <Component {...pageProps} />
      </main>
    </AppProvider>
  </div>
);

export default MyApp;
