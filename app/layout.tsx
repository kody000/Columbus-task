// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Columbus Products",
  description: "Product listing — recruitment exercise",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
      <body>{children}</body>
      </html>
  );
}