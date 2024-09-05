import React from 'react'
import Image from 'next/image';
import ProductCard from '../../../components/ProductCard';

import { supabase } from '../../../lib/supabaseClient';
import styles from "../SubProducts.module.css"

import type { Metadata } from 'next';


// Define metadata for the Headsets page
export const metadata: Metadata = {
  title: "Headsets | AlCheez",
  description: "Explore a wide range of headsets at AlCheez. Find the perfect headset for your needs with our selection of top-quality products!",
  openGraph: {
    url: "https://alcheez.com/electronics/headsets",
    title: "Headsets | AlCheez",
    description: "Shop the latest headsets at AlCheez. Discover high-quality and affordable options for all your audio needs!",
    type: "website",
    images: [
      {
        url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png",
        width: 1200,
        height: 630,
        alt: "Headsets at AlCheez",
      },
    ],
  },
  twitter: {
    site: "@AlCheez",
    title: "Headsets | AlCheez",
    description: "Check out the best headsets available at AlCheez. Shop now for premium and budget-friendly options!",
    creator: "@AlCheez",
    card: "summary_large_image",
    images: ["https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
};


export default async function Headsets() {

  // Fetch only the data for headsets (assuming category_id for headsets is 1)
  const { data: headsetsData, error } = await supabase
    .from('products')
    .select('*, productimages!inner(image_url)')
    .eq('category_id', 1) // Fetch only products with category_id of 1
    .order('product_id');

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading products.</div>;
  }

  const headsetsCardsArray = headsetsData.map((item, index) => (
    <ProductCard key={index} data={item} />
  ));

  return (
    <div className={styles.subProduct_container}>
      <picture>
        {/* Large screen image */}
        <source 
          srcSet="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png"
          media="(min-width: 768px)" 
        />
        {/* Small screen image */}
        <Image 
          src="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Smaller-Screen-Ad.png" 
          alt="headsets-image"
          layout="responsive"
          width={100}
          height={50}
          className={styles.subproduct_image}
        />
      </picture>
      <div className={styles.subProduct_products_container}>
        <h1>Headsets</h1>
        <div className={styles.subProduct_card_container}>
          {headsetsCardsArray}
        </div>
      </div>
    </div>
  );
}
