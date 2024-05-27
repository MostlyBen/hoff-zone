import Head from 'next/head';
import { MDXProvider } from "@mdx-js/react";
import { Layout } from '../components/layout';
import '../styles/global.css';
import { ShellProvider } from '../utils/shellProvider';
import { ThemeProvider } from '../utils/themeProvider';
import { useRouter } from 'next/router';

import { a, h1, h2, h3, hr, li, p } from '../mdx';
import { useEffect, useState } from 'react';

const App = ({ Component, pageProps }) => {
  const [frontmatter, setFrontmatter] = useState({})

  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    const fetchFrontmatter = async () => {
      const res = await fetch(`/api/frontmatter?path=${asPath}`);
      console.log("Got api response:", res)
      const data = await res.json();
      console.log("GOT FRONTMATTER DATA:", data)
      setFrontmatter(data);
    }

    fetchFrontmatter()
  }, [asPath])

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

          <Layout frontmatter={frontmatter}>
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
