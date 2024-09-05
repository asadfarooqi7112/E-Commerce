import React from 'react'
import Image from 'next/image';
import ProductCard from '../../../components/ProductCard';

import { supabase } from '../../../lib/supabaseClient';
import styles from "../SubProducts.module.css"

import type { Metadata } from 'next';

// Define metadata for the Speakers page
export const metadata: Metadata = {
  title: "Speakers | AlCheez",
  description: "Discover high-quality speakers at AlCheez. Shop our range of portable and home speakers for the best audio experience!",
  openGraph: {
    url: "https://alcheez.com/electronics/speakers",
    title: "Speakers | AlCheez",
    description: "Shop the best speakers at AlCheez. From portable to home speakers, find the perfect audio solution for your needs!",
    type: "website",
    images: [
      {
        url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Bigger-Screen-Ad.png?t=2024-07-28T16%3A41%3A48.294Z",
        width: 1200,
        height: 630,
        alt: "Speakers at AlCheez",
      },
    ],
  },
  twitter: {
    site: "@AlCheez",
    title: "Speakers | AlCheez",
    description: "Explore top-quality speakers at AlCheez. Perfect for any audio enthusiast!",
    creator: "@AlCheez",
    card: "summary_large_image",
    images: ["https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Bigger-Screen-Ad.png?t=2024-07-28T16%3A41%3A48.294Z"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
};

export default async function Speakers() {

  // Fetch only the data for headsets (assuming category_id for headsets is 1)
  const { data: speakersData, error } = await supabase
    .from('products')
    .select('*, productimages!inner(image_url)')
    .eq('category_id', 2) // Fetch only products with category_id of 1
    .order('product_id');

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading products.</div>;
  }

  const speakersCardsArray = speakersData.map((item, index) => (
    <ProductCard key={index} data={item} />
  ));

  return (
    <div className={styles.subProduct_container}>
      <picture>
        {/* Large screen image */}
        <source 
          srcSet="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Bigger-Screen-Ad.png?t=2024-07-28T16%3A41%3A48.294Z"
          media="(min-width: 768px)" 
        />
        {/* Small screen image */}
        <Image
          src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Smaller-Screen-Ad.png'
          alt='speakers-image'
          layout="responsive"
          width={100}
          height={50}
          className={styles.subproduct_image}
        />
      </picture>
      <div className={styles.subProduct_products_container}>
        <h1>Speakers</h1>
        <div className={styles.subProduct_card_container}>
          {speakersCardsArray}
        </div>
      </div>
    </div>
  );
}
