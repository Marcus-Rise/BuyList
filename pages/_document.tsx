import type { DocumentContext } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import type { DocumentInitialProps } from "next/dist/next-server/lib/utils";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang={"ru"}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
