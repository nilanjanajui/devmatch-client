import "./globals.css";
import Providers from "./providers";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata = {
  title: "DevMatch - Find Developers. Build Startups. Launch Together.",
  description:
    "The premier platform for developer collaboration and startup team formation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}