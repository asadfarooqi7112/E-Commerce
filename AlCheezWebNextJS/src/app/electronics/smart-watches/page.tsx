import React from 'react'
import Image from 'next/image';
import ProductCard from '../../../components/ProductCard';

import { supabase } from '../../../lib/supabaseClient';
import styles from "../SubProducts.module.css"

import type { Metadata } from 'next';
// Define metadata for the Smart Watches page
export const metadata: Metadata = {
  title: "Smart Watches | AlCheez",
  description: "Discover the latest smartwatches at AlCheez. Stay connected and track your fitness with our range of stylish and functional smartwatches.",
  openGraph: {
    url: "https://alcheez.com/electronics/smart-watches",
    title: "Smart Watches | AlCheez",
    description: "Explore our selection of smartwatches at AlCheez. Perfect for staying connected and tracking your health and fitness.",
    type: "website",
    images: [
      {
        url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Bigger-Screen-Ad.png",
        width: 1200,
        height: 630,
        alt: "Smart Watches at AlCheez",
      },
    ],
  },
  twitter: {
    site: "@AlCheez",
    title: "Smart Watches | AlCheez",
    description: "Find the best smartwatches at AlCheez. Keep track of your fitness and stay connected with our wearable tech.",
    creator: "@AlCheez",
    card: "summary_large_image",
    images: ["https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Bigger-Screen-Ad.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
};

export default async function SmartWatches() {

  const { data: smartWatchesData, error } = await supabase
    .from('products')
    .select('*, productimages!inner(image_url)')
    .eq('category_id', 3)
    .order('product_id');

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading products.</div>;
  }

  const smartWatchesCardsArray = smartWatchesData.map((item, index) => (
    <ProductCard key={index} data={item} />
  ));

  return (
    <div className={styles.subProduct_container}>
      <picture>
        {/* Large screen image */}
        <source 
          srcSet="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Bigger-Screen-Ad.png"
          media="(min-width: 768px)" 
        />
        {/* Small screen image */}
        <Image 
          src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Smaller-Screen-Ad.png?t=2024-07-28T16%3A43%3A53.926Z'
          alt='smartwatch-image'
          layout="responsive"
          width={100}
          height={50}
          className={styles.subproduct_image}
        />
      </picture>
      <div className={styles.subProduct_products_container}>
        <h1>Smart Watches</h1>
        <div className={styles.subProduct_card_container}>
          {smartWatchesCardsArray}
        </div>
      </div>
    </div>
  );
}
