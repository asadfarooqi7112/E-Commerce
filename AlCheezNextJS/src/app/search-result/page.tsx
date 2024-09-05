"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProductsContext } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard';
import './SearchResult.css';
import Loading from '../../components/Loading';

// Define the type for product images
interface ProductImage {
  image_url: string;
}

// Define the type for a product
interface Product {
  product_id: number;
  name: string;
  description: string;
  sale_price: number;
  price: number;
  category_id: number; 
  productimages: ProductImage[]; 
  stock: number; 

  // Include other fields as necessary
}

// Define the type for the context
interface ProductsContextType {
  productsData: Product[];
}

export default function SearchResultPage() {
  const { productsData } = useProductsContext() as ProductsContextType;
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || "";
  console.log(query);

  useEffect(() => {
    // Perform search when component mounts or when query changes
    if (productsData.length > 0) {
      const filteredResults = productsData.filter((data) =>
        data.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResult(filteredResults);
      setLoading(false);
    }
  }, [query, productsData]);

  const searchedDataCardsArray = searchResult.map((item) => (
    <ProductCard key={item.product_id} data={item} />
  ));

  return (
    <div className='search-result_container'>
      <div className='result_container'>
        <h1>Search results: &quot;{query}&quot;</h1>
        <div className='s-card_container'>
          {loading ? (
            <Loading />
          ) : (
            searchResult.length > 0 ? (
              searchedDataCardsArray
            ) : (
              <h3 className="no-results">No results found for &quot;{query}&quot;</h3>
            )
          )}
        </div>
      </div>
    </div>
  );
}
