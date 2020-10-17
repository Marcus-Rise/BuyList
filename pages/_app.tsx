import "reflect-metadata";
import "./globals.scss";
import React from "react";
import { Header } from "../components/header.component";
import { AppProvider } from "../store";

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
