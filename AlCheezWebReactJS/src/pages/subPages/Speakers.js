import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Helmet } from 'react-helmet-async';

import "./SubProducts.css"
import Loading from '../../components/Loading';

export default function Speakers() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const speakersCardsArray = productsData.filter((item) => item.category_id === 2).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className='headsets_container'>
    <Helmet>
      <html lang="en" />
      <title>Speakers | AlCheez</title>
      <meta name="description" content="Discover high-quality speakers at AlCheez. Shop our range of portable and home speakers for the best audio experience!" />
      <link rel="canonical" href="https://alcheez.com/electronics/speakers" />
      <meta name="keywords" content="alcheez, electronics, speakers, portable speakers, home speakers, bluetooth speakers, wireless speakers, tech accessories, online electronics store" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="https://alcheez.com/favicon.ico" />

      {/* OG Tags */}
      <meta property="og:url" content="https://alcheez.com/electronics/speakers" />
      <meta property="og:title" content="Speakers | AlCheez" />
      <meta property="og:description" content="Shop the best speakers at AlCheez. From portable to home speakers, find the perfect audio solution for your needs!" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Bigger-Screen-Ad.png?t=2024-07-28T16%3A41%3A48.294Z" />

      {/* Twitter tags */}
      <meta property="twitter:site" content="@AlCheez" />
      <meta property="twitter:title" content="Speakers | AlCheez" />
      <meta property="twitter:description" content="Explore top-quality speakers at AlCheez. Perfect for any audio enthusiast!" />
      <meta property="twitter:creator" content="@AlCheez" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Bigger-Screen-Ad.png?t=2024-07-28T16%3A41%3A48.294Z" />

      <meta name="referrer" content="origin-when-crossorigin" />
    </Helmet>

    {speakersCardsArray.length>0
    ?
      <div className='headsets_products_container'>
    {!isSmallDevice
      ?
      <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Bigger-Screen-Ad.png?t=2024-07-28T16%3A41%3A48.294Z' alt='speakers-image' className='subproduct-image'/>
      :
      <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Smaller-Screen-Ad.png' alt='speakers-image' className='subproduct-image'/>
    }
    <h1>Speakers</h1>
      <div className='headsets-card_container'>
        {speakersCardsArray}
      </div>
    </div>
    :
    <Loading/>
    }
  </div>
  )
}
