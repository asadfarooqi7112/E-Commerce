import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ProductsProvider } from '../context/ProductsContext';
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlCheez",
  description: "Welcome to AlCheez, your one-stop shop for the latest electronics, gadgets, and tech accessories. Explore our wide range of products today!",
  icons:{
    icon: [
      '/favicon.ico'
    ],
    apple: [
      '/apple-touch-icon.png'
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ],
  },
  manifest: './site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Suspense>
        <ProductsProvider>
          <ShoppingCartProvider>
            <Navbar/>
                {children}
            <Footer/>
          </ShoppingCartProvider>
        </ProductsProvider>
        </Suspense>
      </body>
    </html>
  );
}
