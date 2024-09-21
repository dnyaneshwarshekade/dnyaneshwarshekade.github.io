import "animate.css"; // Animation styles
import "tippy.js/dist/tippy.css"; // Tooltip styles
import "styles/globals.css"; // Your global styles

import Navigation from "components/Navigation"; // Navigation component
import NoSSR from "components/NoSSR"; // NoSSR wrapper
import ThemeProvider from "contexts/ThemeProvider"; // Theme context
import type { AppProps } from "next/app"; // Type for app props
import Head from "next/head"; // Head component for metadata
import { Roboto } from 'next/font/google'; // Google Font

// Import Google Font
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Dnyaneshwar Shekade&apos;s - Portfolio</title>
        <meta name="description" content="Portfolio of Dnyaneshwar Shekade, a Linux Server & DevOps Engineer with expertise in server management, cloud services, and virtualization." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>

      <ThemeProvider>
        <div className={roboto.className}>
          <Component {...pageProps} />

          <NoSSR>
            <Navigation />
          </NoSSR>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
