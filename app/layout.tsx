import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/assets/globals.css";

export const metadata: Metadata = {
  title: "Cookie Clicker",
  description:
    "Cookie Clicker clone made with Next.js and React by @OsmanTunahan",
};

const defaultFont = localFont({
  src: "../assets/fonts/Itim-Regular.ttf",
  variable: "--font-itim",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${defaultFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
