import Head from 'next/head';
import { MDXProvider } from "@mdx-js/react";
import React, { useEffect } from 'react';
import { Layout } from '../components/layout';
import '../styles/global.css';
import { ShellProvider } from '../utils/shellProvider';
import { ThemeProvider } from '../utils/themeProvider';

import { A, H1, HR } from '../mdx';

const isTrackingEnabled = process.env.NEXT_PUBLIC_ENABLE_TRACKING === 'true';
const trackingUrl = process.env.NEXT_PUBLIC_TRACKING_URL;
const trackingWebsiteId = process.env.NEXT_PUBLIC_TRACKING_SITE_ID;

const App = ({ Component, pageProps }) => {

  useEffect(() => {
    localStorage.setItem('visitedAt', new Date().toString());
  }, []);

  return (
    <MDXProvider
      components={{
        a: A,
        h1: H1,
        hr: HR,
      }}
    >
      <ThemeProvider>
        <ShellProvider>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
              key="viewport"
            />

            {isTrackingEnabled && (
              <script
                async
                src={trackingUrl}
                data-website-id={trackingWebsiteId}
              ></script>
            )}
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ShellProvider>
      </ThemeProvider>
    </MDXProvider>
  );
};

export default (props) => {
  return <App {...props} />;
};
