import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";

import "./SubProducts.css"

export default function Headsets() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const headsetsCardsArray = productsData.filter((item) => item.category_id === 1).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className='headsets_container'>
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
