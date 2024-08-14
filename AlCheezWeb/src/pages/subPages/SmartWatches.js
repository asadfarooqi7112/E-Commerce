import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Helmet } from 'react-helmet-async';

import "./SubProducts.css"

export default function SmartWatches() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const smartWatchesCardsArray = productsData.filter((item) => item.category_id === 3).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className='headsets_container'>
    <Helmet>
      <html lang="en" />
      <title>Smart Watches | AlCheez</title>
      <meta name="description" content="Discover the latest smartwatches at AlCheez. Stay connected and track your fitness with our range of stylish and functional smartwatches." />
      <link rel="canonical" href="https://alcheez.com/smart-watches" />
      <meta name="keywords" content="alcheez, smart watches, fitness trackers, wearable tech, smart devices, online electronics store" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="https://alcheez.com/favicon.ico" />

      {/* OG Tags */}
      <meta property="og:url" content="https://alcheez.com/smart-watches" />
      <meta property="og:title" content="Smart Watches | AlCheez" />
      <meta property="og:description" content="Explore our selection of smartwatches at AlCheez. Perfect for staying connected and tracking your health and fitness." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Bigger-Screen-Ad.png" />

      {/* Twitter Tags */}
      <meta property="twitter:site" content="@AlCheez" />
      <meta property="twitter:title" content="Smart Watches | AlCheez" />
      <meta property="twitter:description" content="Find the best smartwatches at AlCheez. Keep track of your fitness and stay connected with our wearable tech." />
      <meta property="twitter:creator" content="@AlCheez" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Bigger-Screen-Ad.png" />

      {/* Referrer */}
      <meta name="referrer" content="origin-when-crossorigin" />
    </Helmet>

    <div className='headsets_products_container'>
      {!isSmallDevice
        ?
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Bigger-Screen-Ad.png' alt='smartwatch-image' className='subproduct-image'/>
        :
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Smaller-Screen-Ad.png?t=2024-07-28T16%3A43%3A53.926Z' alt='smartwatch-image' className='subproduct-image'/>
      }
      <h1>Smart Watches</h1>
      <div className='headsets-card_container'>
        {smartWatchesCardsArray}
      </div>
    </div>
  </div>
  )
}
