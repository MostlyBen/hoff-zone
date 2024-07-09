import type { MDXComponents } from "mdx/types";
import { a, blockquote, h1, h2, h3, h4, hr, li, p } from './mdx';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a, blockquote, h1, h2, h3, h4, hr, li, p,
    ...components,
  };
}
