import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Helmet } from 'react-helmet-async';

import "./SubProducts.css"

export default function Headsets() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const headsetsCardsArray = productsData.filter((item) => item.category_id === 1).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className='headsets_container'>
     <Helmet>
        <html lang="en" />
        <title>Headsets | AlCheez</title>
        <meta name="description" content="Explore a wide range of headsets at AlCheez. Find the perfect headset for your needs with our selection of top-quality products!" />
        <link rel="canonical" href="https://alcheez.com/headsets" />
        <meta name="keywords" content="alcheez, headsets, headphones, earphones, wireless headsets, gaming headsets, tech accessories, online electronics store" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        <meta property="og:url" content="https://alcheez.com/headsets" />
        <meta property="og:title" content="Headsets | AlCheez" />
        <meta property="og:description" content="Shop the latest headsets at AlCheez. Discover high-quality and affordable options for all your audio needs!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png" />

        {/* Twitter tags */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="Headsets | AlCheez" />
        <meta property="twitter:description" content="Check out the best headsets available at AlCheez. Shop now for premium and budget-friendly options!" />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png" />

        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>

    <div className='headsets_products_container'>
        {!isSmallDevice
        ?
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png' alt='headsets-image' className='subproduct-image'/>
        :
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Smaller-Screen-Ad.png' alt='headsets-image' className='subproduct-image'/>
        }
        <h1>Headsets</h1>
        <div className='headsets-card_container'>
          {headsetsCardsArray}
        </div>
    </div>
  </div>
  )
}
