import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";

import "./SubProducts.css"

export default function Headsets() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const mobileLaptopStandsCardsArray = productsData.filter((item) => item.category_id === 6).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className='headsets_container'>
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
