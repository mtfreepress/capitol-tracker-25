import Document, { Html, Head, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Load Parsley async to make next happy */}
        <script
          id="parsely-cfg"
          src="https://cdn.parsely.com/keys/montanafreepress.org/p.js"
          async
        />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = Document.getInitialProps;