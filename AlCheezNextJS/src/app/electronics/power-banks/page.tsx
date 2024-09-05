import React from 'react'
import Image from 'next/image';
import ProductCard from '../../../components/ProductCard';

import { supabase } from '../../../lib/supabaseClient';
import styles from "../SubProducts.module.css"

import type { Metadata } from 'next';

// Define metadata for the Power Banks page
export const metadata: Metadata = {
  title: "Power Banks | AlCheez",
  description: "Stay powered on the go with our high-quality power banks. Shop at AlCheez for reliable and portable charging solutions for your devices.",
  openGraph: {
    url: "https://alcheez.com/electronics/power-banks",
    title: "Power Banks | AlCheez",
    description: "Explore our selection of reliable power banks at AlCheez. Perfect for keeping your devices charged wherever you go.",
    type: "website",
    images: [
      {
        url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Bigger-Screen-Ad.png",
        width: 1200,
        height: 630,
        alt: "Power Banks at AlCheez",
      },
    ],
  },
  twitter: {
    site: "@AlCheez",
    title: "Power Banks | AlCheez",
    description: "Discover the best power banks at AlCheez. Keep your devices powered with our portable charging solutions.",
    creator: "@AlCheez",
    card: "summary_large_image",
    images: ["https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Bigger-Screen-Ad.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
};

export default async function PowerBanks() {

  // Fetch only the data for headsets (assuming category_id for headsets is 1)
  const { data: powerBanksData, error } = await supabase
    .from('products')
    .select('*, productimages!inner(image_url)')
    .eq('category_id', 4)
    .order('product_id');

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading products.</div>;
  }

  const powerBanksCardsArray = powerBanksData.map((item, index) => (
    <ProductCard key={index} data={item} />
  ));

  return (
    <div className={styles.subProduct_container}>
      <picture>
        {/* Large screen image */}
        <source 
          srcSet="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Bigger-Screen-Ad.png"
          media="(min-width: 768px)" 
        />
        {/* Small screen image */}
        <Image 
          src="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Smaller-Screen-Ad.png" 
          alt='powerbank-image'
          layout="responsive"
          width={100}
          height={50}
          className={styles.subproduct_image}
        />
      </picture>
      <div className={styles.subProduct_products_container}>
        <h1>Power Banks</h1>
        <div className={styles.subProduct_card_container}>
          {powerBanksCardsArray}
        </div>
      </div>
    </div>
  );
}
