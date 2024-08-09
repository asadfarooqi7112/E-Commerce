import React from 'react'
import ProductCard from '../../components/ProductCard';
import {useProductsContext } from '../../context/ProductsContext';
import { useMediaQuery } from "../../hooks/useMediaQuery";

import "./SubProducts.css"

export default function Headsets() {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const {productsData} = useProductsContext();
  const chargersCablesCardsArray = productsData.filter((item) => item.category_id === 5).map((item, index) => (<ProductCard key={index} data={item} />));
  return (
  <div className='headsets_container'>
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
  </div>
  )
}
