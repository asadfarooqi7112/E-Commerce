import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import Link from 'next/link';

// Define types for product data
interface Product {
  name: string;
  category_id: number;
  product_id: number;
}

// Define the state and other variables with appropriate types
export default function SearchBar() {
  const { productsData } = useProductsContext();
  const [result, setResult] = useState<Product[]>([]);
  const [isResult, setIsResult] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  // Type the parameter for useDebouncedCallback
  const handleChange = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    router.replace(`${pathName}?${params.toString()}`);
    setIsResult(true);
  }, 1000);

  useEffect(() => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const filteredResults = productsData.filter((data) => {
      return data.name.toLowerCase().includes(query);
    });
    setResult(filteredResults);
  }, [searchParams, productsData]);

  // Handle click outside of the search bar
  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setIsResult(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
    };
  }, []);

  // Type the parameter for handleKeyDown
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/search-result?${searchParams.toString()}`)
      setIsResult(false);

    }
  };

  return (
    <div className="search-bar-container" ref={searchBarRef}>
      <div style={{ display: 'flex', alignItems: 'center', borderRadius: '4px', padding: '5px' }}>
        <input
          className="search-bar-input"
          placeholder='Type to search'
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          defaultValue={searchParams.get('query') ?? ''}
        />
        <FaSearch
          className="search-bar-icon"
          onClick={() => {
            router.push(`/search-result?${searchParams.toString()}`)
            setIsResult(false);
          }}
        />
      </div>
      {isResult && result.length > 0 && (
        <div className="search-results">
          {result.map((data, index) => (
            <div
              key={index}
              onClick={()=>router.push(`/electronics/${data.category_id}/${data.product_id}-${data.name.toLowerCase().replace(/[\s\\/]+/g, '-')}`)}
              >
              <p className="search-result" onClick={() => setIsResult(false)}>
                {data.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
