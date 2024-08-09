import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";

import "./SubProducts.css"

export default function Headsets() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const speakersCardsArray = productsData.filter((item) => item.category_id === 2).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
    <div className='headsets_container'>
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
  </div>
  )
}
