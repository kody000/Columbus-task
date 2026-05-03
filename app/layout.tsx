import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {CartProvider} from "@/context/CartContext";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Columbus Products",
    description: "Product listing — recruitment task",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={inter.variable}>
        <CartProvider>
            <body>
            {children}
            </body>
        </CartProvider>
        </html>
    );
}