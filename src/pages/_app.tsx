import Head from 'next/head';
import { MDXProvider } from "@mdx-js/react";
import { Layout } from '../components/layout';
import '../styles/global.css';
import { ShellProvider } from '../utils/shellProvider';
import { ThemeProvider } from '../utils/themeProvider';

import { a, h1, h2, h3, hr, li, p } from '../mdx';

const App = ({ Component, pageProps }) => {

  return (
    <MDXProvider
      components={{ a, h1, h2, h3, hr, li, p }}
    >
      <ThemeProvider>
        <ShellProvider>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
              key="viewport"
            />
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
