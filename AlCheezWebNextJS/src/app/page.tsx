import Home from "@/components/home";
import Loading from "@/components/Loading";
import { supabase } from "@/lib/supabaseClient";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Home | AlCheez",
  description: "Welcome to AlCheez, your one-stop shop for the latest electronics, gadgets, and tech accessories. Explore our wide range of products today!",
  openGraph: {
    url: "https://alcheez.com/",
    title: "AlCheez Online Store",
    description: "Shop the latest electronics, gadgets, and tech accessories at AlCheez. Discover unbeatable prices and top-quality products today!",
    type: "website",
    images: [
      {
        url: "https://alcheez.com/AlCheez-Logo.png",
        width: 384,
        height: 384,
        alt: "AlCheez Online Store",
      },
    ],
  },
  twitter: {
    site: "@AlCheez",
    title: "AlCheez Online Store",
    description: "Check out the latest electronics, gadgets, and tech accessories at AlCheez. Your trusted online store for all things tech!",
    creator: "@AlCheez",
    card: "summary_large_image",
    images: ["https://alcheez.com/AlCheez-Logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin", 
};



export default async function HomePage() {

  const {data: productsData, error} = await supabase
  .from('products')
  .select('*,productimages!inner(image_url)')
  .order('product_id')

  if(error){
    console.error('Error fetching data:', error);
    return <div>Error loading products.</div>;
  }
    // Show loading spinner if data is still being fetched
  if (!productsData) {
    return <Loading />;
  }
  return (
    <main>
      <Home productsData={productsData} />
    </main>
  );
}