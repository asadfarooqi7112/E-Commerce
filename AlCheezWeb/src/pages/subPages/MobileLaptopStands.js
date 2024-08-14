import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Helmet } from 'react-helmet-async';

import "./SubProducts.css"

export default function MobileLaptopStands() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const mobileLaptopStandsCardsArray = productsData.filter((item) => item.category_id === 6).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className='headsets_container'>
    <Helmet>
        <html lang="en" />
        <title>Mobile & Laptop Stands | AlCheez</title>
        <meta name="description" content="Discover a range of mobile and laptop stands at AlCheez. Find the perfect stand to enhance your workspace and keep your devices organized!" />
        <link rel="canonical" href="https://alcheez.com/mobile-laptop-stands" />
        <meta name="keywords" content="alcheez, mobile stands, laptop stands, tech accessories, workspace organization, online electronics store" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        <meta property="og:url" content="https://alcheez.com/mobile-laptop-stands" />
        <meta property="og:title" content="Mobile & Laptop Stands | AlCheez" />
        <meta property="og:description" content="Shop for mobile and laptop stands at AlCheez. Enhance your workspace with our selection of high-quality stands for better device organization!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Bigger-Screen-Ad.png" />

        {/* Twitter tags */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="Mobile & Laptop Stands | AlCheez" />
        <meta property="twitter:description" content="Explore our collection of mobile and laptop stands at AlCheez. Perfect for keeping your devices organized and enhancing your workspace!" />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Bigger-Screen-Ad.png" />

        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>
    <div className='headsets_products_container'>
      {!isSmallDevice
        ?
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Bigger-Screen-Ad.png' alt='stands-image' className='subproduct-image'/>
        :
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Smaller-Screen-Ad.png' alt='stands-image' className='subproduct-image'/>
      }
      <h1>Mobile & Laptop Stands</h1>
      <div className='headsets-card_container'>
        {mobileLaptopStandsCardsArray}
      </div>
    </div>
  </div>
  )
}
