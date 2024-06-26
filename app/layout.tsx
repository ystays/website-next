import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense, useEffect } from "react";

import { Theme } from "@radix-ui/themes";

export const metadata = {
  title: "ystays.com",
  description:
    "ys' personal website, portfolio and blog. An ambitious project.",
  twitter: {
    card: "summary_large_image",
    title: "ystays.com",
    description:
      "ys' personal website, portfolio and blog. An ambitious project.",
    images: ["/logo.png"],
    creator: "@theystayhere",
  },
  openGraph: {
    title: "ystays.com",
    description: 
     "ys' personal website, portfolio and blog. An ambitious project.",
    url: "https://ystays.com",
    siteName: "ystays",
    images: [{
      url: '/logo.png',
      width: 800,
      height: 800,
    },],
    type: "website",
  },
  metadataBase: new URL("https://ystays.com"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-amber-50" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
