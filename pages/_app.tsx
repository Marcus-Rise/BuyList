import "./globals.scss";
import React from "react";
import { Header } from "../components/header.component";

const MyApp = ({ Component, pageProps }) => (
  <div className="d-flex flex-column h-100">
    <Header />
    <main role="main" className="flex-shrink-0">
      <Component {...pageProps} />
    </main>
  </div>
);

export default MyApp;
