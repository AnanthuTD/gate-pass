import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Layout from "@/app/layoutProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gate Pass",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <AntdRegistry><Layout>{children}</Layout></AntdRegistry>
      </body>
    </html>
  );
}
