import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' data-theme='dracula'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='Chess profile created from chess.com data'
        />
        <meta name='keywords' content='chess, profile, stats' />
        <meta name='author' content='Ricky DeFazio' />

        {/* Social Media Meta Tags */}
        <meta property='og:title' content='Chess Profile' />
        <meta
          property='og:description'
          content='Chess profile created from chess.com data'
        />
        <meta
          property='og:image'
          content='https://chessprofile.vercel.app/defaultImage.jpg'
        />
        <meta property='og:url' content='https://chessprofile.vercel.app/' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
