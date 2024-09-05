import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Helmet } from 'react-helmet-async';

import "./SubProducts.css"
import Loading from '../../components/Loading';

export default function PowerBanks() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const powerBanksCardsArray = productsData.filter((item) => item.category_id === 4).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
    <div className='headsets_container'>
      <Helmet>
        <html lang="en" />
        <title>Power Banks | AlCheez</title>
        <meta name="description" content="Stay powered on the go with our high-quality power banks. Shop at AlCheez for reliable and portable charging solutions for your devices." />
        <link rel="canonical" href="https://alcheez.com/power-banks" />
        <meta name="keywords" content="alcheez, power banks, portable chargers, mobile power bank, external battery, tech accessories, online electronics store" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        <meta property="og:url" content="https://alcheez.com/power-banks" />
        <meta property="og:title" content="Power Banks | AlCheez" />
        <meta property="og:description" content="Explore our selection of reliable power banks at AlCheez. Perfect for keeping your devices charged wherever you go." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Bigger-Screen-Ad.png" />

        {/* Twitter tags */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="AlCheez Online Store - Power Banks" />
        <meta property="twitter:description" content="Discover the best power banks at AlCheez. Keep your devices powered with our portable charging solutions." />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Bigger-Screen-Ad.png" />

        {/* Referrer */}
        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>
      {powerBanksCardsArray.length>0
      ?
        <div className='headsets_products_container'>
      {!isSmallDevice
        ?
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Bigger-Screen-Ad.png' alt='powerbank-image' className='subproduct-image'/>
        :
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Smaller-Screen-Ad.png' alt='powerbank-image' className='subproduct-image'/>
      }
        <h1>Power Banks</h1>
      <div className='headsets-card_container'>
          {powerBanksCardsArray}
        </div>
      </div>
      :
      <Loading/>
    }
  </div>
  )
}
