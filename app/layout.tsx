import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

import { Theme } from "@radix-ui/themes";

export const metadata = {
  title: "ystays.com",
  description:
    "ys' personal website",
  twitter: {
    card: "summary_large_image",
    title: "ystays.com",
    description:
      "ys' personal website",
    creator: "@theystayhere",
  },
  metadataBase: new URL("https://ystays.com"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-indigo-100" />
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
