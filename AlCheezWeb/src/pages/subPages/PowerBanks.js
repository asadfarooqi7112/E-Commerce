import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";

import "./SubProducts.css"

export default function Headsets() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const powerBanksCardsArray = productsData.filter((item) => item.category_id === 4).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
    <div className='headsets_container'>
      {!isSmallDevice
        ?
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Bigger-Screen-Ad.png' alt='powerbank-image' className='subproduct-image'/>
        :
        <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Smaller-Screen-Ad.png' alt='powerbank-image' className='subproduct-image'/>
      }
      <div className='headsets_products_container'>
      <h1>Power Banks</h1>
      <div className='headsets-card_container'>
        {powerBanksCardsArray}
      </div>
    </div>
  </div>
  )
}
