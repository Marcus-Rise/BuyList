import "../src/styles/globals.scss";
import React, { useEffect } from "react";
import { Header } from "../src/components";
import "typeface-montserrat";
import Head from "next/head";
import { Footer } from "../src/components/footer.component";
import type { AppComponent } from "next/dist/next-server/lib/router/router";
import { Provider, useSession } from "next-auth/client";
import { useInject } from "../src/ioc";
import type { IProductListService } from "../src/product-list";
import { PRODUCT_LIST_SERVICE_PROVIDER } from "../src/product-list";

const MyApp: AppComponent = ({ Component, pageProps }) => {
  const [, isAuthed] = useSession();
  const service = useInject<IProductListService>(PRODUCT_LIST_SERVICE_PROVIDER);

  useEffect(() => {
    console.debug(isAuthed);

    if (isAuthed) {
      service.sync();
    }
  }, [isAuthed, service]);

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
