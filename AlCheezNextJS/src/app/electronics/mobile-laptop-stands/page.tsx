import Image from 'next/image';
import ProductCard from '../../../components/ProductCard';

import styles from "../SubProducts.module.css"
import { supabase } from '@/lib/supabaseClient';
import type { Metadata } from 'next';

// Define metadata for the Mobile & Laptop Stands page
export const metadata: Metadata = {
  title: "Mobile & Laptop Stands | AlCheez",
  description: "Discover a range of mobile and laptop stands at AlCheez. Find the perfect stand to enhance your workspace and keep your devices organized!",
  openGraph: {
    url: "https://alcheez.com/electronics/mobile-laptop-stands",
    title: "Mobile & Laptop Stands | AlCheez",
    description: "Shop for mobile and laptop stands at AlCheez. Enhance your workspace with our selection of high-quality stands for better device organization!",
    type: "website",
    images: [
      {
        url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Bigger-Screen-Ad.png",
        width: 1200,
        height: 630,
        alt: "Mobile & Laptop Stands at AlCheez",
      },
    ],
  },
  twitter: {
    site: "@AlCheez",
    title: "Mobile & Laptop Stands | AlCheez",
    description: "Explore our collection of mobile and laptop stands at AlCheez. Perfect for keeping your devices organized and enhancing your workspace!",
    creator: "@AlCheez",
    card: "summary_large_image",
    images: ["https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Bigger-Screen-Ad.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
};


export default async function MobileLaptopStands() {

  const {data: mobileLaptopStandsData, error} = await supabase
    .from('products')
    .select('*,productimages!inner(image_url)')
    .eq('category_id',6)
    .order('product_id');

  if(error){
    console.log('Error fetching data:', error)
    return <div>Error loading products.</div>;
  }


  const mobileLaptopStandsCardsArray = mobileLaptopStandsData.map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className={styles.subProduct_container}>
    <picture>
      <source
        srcSet='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Bigger-Screen-Ad.png'
        media='(min-width:768px)'
      />
      <Image 
        src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Smaller-Screen-Ad.png'
        alt='stands-image'
        layout="responsive"
        width={100}
        height={50}
        className={styles.subproduct_image}
      />
    </picture>
    <div className={styles.subProduct_products_container}>
      <h1>Mobile & Laptop Stands</h1>
      <div className={styles.subProduct_card_container}>
          {mobileLaptopStandsCardsArray}
      </div>
    </div>
  </div>
  )
}
