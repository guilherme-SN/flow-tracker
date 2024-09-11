import type { Metadata } from "next";

import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FlowTracker",
  description: "An implementation of a timer that uses the Flow Time method",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex flex-row justify-between">
          <h1 className="font-bold">FlowTracker</h1>
          <div className="flex flex-row justify-between gap-x-20">
            <Image
            src="icons/help-circle.svg"
            alt="Help Icon"
            width={40}
            height={40}
          />
            <Image
            src="icons/settings.svg"
            alt="Settings Icon"
            width={40}
            height={40}
          />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
