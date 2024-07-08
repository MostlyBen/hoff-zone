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

import { ThemeProvider } from "utils/themeProvider";
import { Layout } from "components/layout";

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
