// src/context/ProductsContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

// Define your product type
type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  stock: number;
  category_id: number;
  created_at: string;
  productimages: { image_url: string }[]; // Adjust this type if the structure is different
};

// Define your product color type
type ProductColor = {
  color_id: number;
  product_id: number;
  color_name: string;
  color_code: string;
};

type ProductsContextType = {
  productsData: Product[];
  productColors: ProductColor[];
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  searchWord: string;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [productColors, setProductColors] = useState<ProductColor[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, productimages!inner(image_url)')
        .order('product_id');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProductsData(data as Product[]);
      }
    };

    fetchProducts();

    const fetchProductColors = async () => {
      const { data, error } = await supabase
        .from('productcolors')
        .select('*');
      if (error) {
        console.error('Error fetching product colors:', error);
      } else {
        setProductColors(data as ProductColor[]);
      }
    };

    fetchProductColors();
  }, []);

  return (
    <ProductsContext.Provider value={{ productsData, productColors, setSearchWord, searchWord }}>
      {children}
    </ProductsContext.Provider>
  );
};
