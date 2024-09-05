import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading';

import "./SubProducts.css"

export default function ChargerCables() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const chargersCablesCardsArray = productsData.filter((item) => item.category_id === 5).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className='headsets_container'>
     <Helmet>
        <html lang="en" />
        <title>Chargers & Cables | AlCheez</title>
        <meta name="description" content="Find a wide selection of chargers and cables at AlCheez. Shop for high-quality and reliable tech accessories today!" />
        <link rel="canonical" href="https://alcheez.com/chargers-cables" />
        <meta name="keywords" content="alcheez, electronics, chargers, cables, tech accessories, mobile accessories, power cables, charging cables, online electronics store" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        <meta property="og:url" content="https://alcheez.com/chargers-cables" />
        <meta property="og:title" content="Chargers & Cables | AlCheez" />
        <meta property="og:description" content="Discover top-quality chargers and cables at AlCheez. Shop now for the best prices on tech accessories!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Bigger_Screen-Ad.png" />

        {/* Twitter tags */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="Chargers & Cables | AlCheez" />
        <meta property="twitter:description" content="Shop the latest chargers and cables at AlCheez. Your go-to store for all tech accessories!" />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Bigger_Screen-Ad.png" />

        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>
      
{ chargersCablesCardsArray.length>0
?
  <div className='headsets_products_container'>
      {!isSmallDevice
        ?
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Bigger_Screen-Ad.png' alt='charger-cable-image' className='subproduct-image'/>
        :
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Smaller-Screen-Ad.png' alt='charger-cable-image' className='subproduct-image'/>
      }
      <h1>Chargers & Cables</h1>
      <div className='headsets-card_container'>
        {chargersCablesCardsArray}
      </div>
    </div>
    :
    <Loading/>
    }
  </div>
  )
}
