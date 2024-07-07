import Head from 'next/head';
import { MDXProvider } from "@mdx-js/react";
import { Layout } from '../components/layout';
import '../styles/global.css';
import { ShellProvider } from '../utils/shellProvider';
import { ThemeProvider } from '../utils/themeProvider';
import { useRouter } from 'next/router';

import { a, blockquote, h1, h2, h3, h4, hr, li, p } from '../mdx';
import { useEffect, useState } from 'react';

const App = ({ Component, pageProps }) => {
  const [frontmatter, setFrontmatter] = useState<object>({})

  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    const fetchFrontmatter = async () => {
      const res = await fetch(`/api/frontmatter?path=${asPath}`);
      const pageData = await res.json();
      setFrontmatter(pageData.data);
    }

    fetchFrontmatter()
  }, [asPath])

  return (
    <MDXProvider
      components={{ a, blockquote, h1, h2, h3, h4, hr, li, p }}
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
