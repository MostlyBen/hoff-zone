import "./global.css";
import "../styles/animations.css";
import "../styles/components.css";
import "../styles/utilities.css";

import localFont from 'next/font/local';

const CascadiaCode = localFont({
  src: '../public/assets/fonts/CascadiaCode.ttf',
  display: 'swap',
  variable: '--font-cascadia-code'
})

import { Metadata } from "next";
import siteMeta from './metadata.json';
import { ThemeProvider } from "utils/providers/themeProvider";
import { Layout } from "components/layout";

export const metadata: Metadata = siteMeta;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${CascadiaCode.variable}`} suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
        <ThemeProvider>
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
