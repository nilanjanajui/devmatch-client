import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "DevMatch — Find Developers. Build Startups. Launch Together.",
  description:
    "The premier platform for developer collaboration and startup team formation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}