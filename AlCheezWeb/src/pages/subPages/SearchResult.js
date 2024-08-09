import React from 'react'

import { useProductsContext } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard';
import "./SearchResult.css"

export default function SearchResult() {
    const {searchResult, searchWord} = useProductsContext();

    const searchedDataCardsArray = searchResult.map((item,index)=><ProductCard key={index} data = {item} />)
  return (
    <div  className='search-result_container'>
        <div className='result_container'>
            <h1>Search results: "{searchWord}"</h1>
            <div className='s-card_container'>
                {searchResult.length > 0 && searchedDataCardsArray}
            </div>
        </div>
        {searchResult.length ===0 && <h3 style={{height:"25vw"}} className="no-results">No results found</h3>}
    </div>
  )
}
