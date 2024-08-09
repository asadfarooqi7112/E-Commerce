import React from 'react'

import "./Electronics.css"
import ProductCard from '../components/ProductCard'
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function Electronics(props) {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const allProductsCardsArray = props.productsData.map((item,index)=><ProductCard key={index} data = {item} />)
  
  return (
    <div className='electronics_container'>
      <div className='products_container'>
        {!isSmallDevice
          ?
          <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/electronics-main-photo-larger-screen.png' alt='electronics-image' className='subproduct-image'/>
          :
          <img src='https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/electronics-main-photo-smaller-screen.png' alt='electronics-image' className='subproduct-image'/>
          }
        <h1>Electronics</h1>
        <div className='e-card_container'>
          {allProductsCardsArray}
        </div>
      </div>
    </div>
  )
}
