import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={"ru"} className="h-100">
        <Head />
        <body className="h-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
