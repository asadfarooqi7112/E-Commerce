import Image from 'next/image';
import ProductCard from '../../../components/ProductCard';


import { supabase } from '@/lib/supabaseClient';
import styles from "../SubProducts.module.css"

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Chargers & Cables | AlCheez",
  description: "Find a wide selection of chargers and cables at AlCheez. Shop for high-quality and reliable tech accessories today!",
  openGraph: {
    url: "https://alcheez.com/electronics/chargers-cables",
    title: "Chargers & Cables | AlCheez",
    description: "Discover top-quality chargers and cables at AlCheez. Shop now for the best prices on tech accessories!",
    type: "website",
    images: [
      {
        url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Bigger_Screen-Ad.png",
        width: 1200,
        height: 630,
        alt: "Chargers & Cables at AlCheez",
      },
    ],
  },
  twitter: {
    site: "@AlCheez",
    title: "Chargers & Cables | AlCheez",
    description: "Shop the latest chargers and cables at AlCheez. Your go-to store for all tech accessories!",
    creator: "@AlCheez",
    card: "summary_large_image",
    images: ["https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Bigger_Screen-Ad.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
};


export default async function ChargerCables() {

  const {data: chargersCablesData, error} = await supabase
  .from('products')
  .select('*, productimages!inner(image_url)')
  .eq('category_id', 5)
  .order('product_id');

  if(error){
    console.error('Error fetching data:', error);
    return <div>Error loading products.</div>;
  }
  const chargersCablesCardsArray = chargersCablesData.map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className={styles.subProduct_container}>
    <picture>
      <source 
        srcSet='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Bigger_Screen-Ad.png'
        media='(min-width: 768px)'
      />
      <Image 
        src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Smaller-Screen-Ad.png'
        alt='charger-cable-image'
        layout='responsive'
        width={100}
        height={50}
        className={styles.subproduct_image}
      />
    </picture>
    <div className={styles.subProduct_products_container}>
        <h1>Chargers & Cables</h1>
        <div className={styles.subProduct_card_container}>
            {chargersCablesCardsArray}
        </div>
    </div>
  </div>
  )
}
