import ProductCard from '../../components/ProductCard'
import { supabase } from '@/lib/supabaseClient';

import styles from "./Electronics.module.css"
import Image from 'next/image';
import type { Metadata } from 'next';


// Metadata for the Electronics page
export const metadata: Metadata = {
  title: "Electronics | AlCheez",
  description: "Discover the best in electronics at AlCheez! From cutting-edge gadgets to top-quality tech accessories, find everything you need to stay connected and powered up. Shop our extensive collection of electronics today!",
  openGraph: {
    url: "https://alcheez.com/electronics",
    title: "Electronics | AlCheez",
    description: "Shop the latest electronics, gadgets, and tech accessories at AlCheez. Discover unbeatable prices and top-quality products today!",
    type: "website",
    images: [
      {
        url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/electronics-main-photo-larger-screen.png",
        width: 1200,
        height: 630,
        alt: "Electronics at AlCheez",
      },
    ],
  },
  twitter: {
    site: "@AlCheez",
    title: "Electronics | AlCheez",
    description: "Check out the latest electronics, gadgets, and tech accessories at AlCheez. Your trusted online store for all things tech!",
    creator: "@AlCheez",
    card: "summary_large_image",
    images: ["https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/electronics-main-photo-larger-screen.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",  // Corrected referrer policy
};

export default async function Electronics() {

  const {data: electronicsData, error} = await supabase
  .from('products')
  .select('*,productimages!inner(image_url)')
  .order('product_id')

  if(error){
    console.error('Error fetching data:', error);
    return <div>Error loading products.</div>;
  }

  const allProductsCardsArray = electronicsData.map((item,index)=><ProductCard key={index} data = {item} />)
  
  return (
    <div className={styles.electronics_container}>
      <picture>
        <source 
          srcSet='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/electronics-main-photo-larger-screen.png'
          media='(min-width:768px)'
        />
        <Image 
          src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/electronics-main-photo-smaller-screen.png'
          alt='electronics-image'
          layout='responsive'
          width={100}
          height={50}
          className={styles.electronics_image}
        />
      </picture>
      <div className={styles.products_container}>
          <h1>Electronics</h1>
          <div className={styles.card_container}>
            {allProductsCardsArray}
          </div>
      </div>
    </div>
  )
}
