import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductDetails from '@/components/ProductDetails';
import type { Metadata } from 'next';

// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const { data: products, error } = await supabase
    .from('products')
    .select('product_id, name, category_id');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return products.map((product) => ({
    category: `${product.category_id}`,
    productName: `${product.product_id}-${product.name.toLowerCase().replace(/[\s\\"/]+/g, '-')}`,
  }));
}

// Define metadata for the product details page
export async function generateMetadata({ params }: { params: { productName: string } }): Promise<Metadata> {
  const current_product_id = parseInt(params.productName.split("-")[0]);

  const { data: productsData, error: productError } = await supabase
    .from('products')
    .select('*, productimages!inner(image_url)')
    .eq('product_id', current_product_id)
    .single();

  if (productError || !productsData) {
    console.error('Error fetching product data:', productError);
    return {
      title: 'Product not found',
      description: 'Product details are not available.',
    };
  }

  const { name, description, sale_price, price, productimages, category_id } = productsData;

  const formattedName = name.toLowerCase().replace(/[\s\\"/]+/g, '-');
  const urlPath = `/electronics/${category_id}/${current_product_id}-${formattedName}`;

  return {
    title: name,
    description: description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 160),
    openGraph: {
      title: name,
      description: description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 160),
      type: 'website',
      url: `https://www.alcheez.com${urlPath}`,
      images: [
        {
          url: productimages[0].image_url,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      site: '@AlCheez',
      title: name,
      description: description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 160),
      creator: '@AlCheez',
      card: 'summary_large_image',
      images: [productimages[0].image_url],
    },
    icons: {
      icon: '/favicon.ico',
    },
    referrer: 'origin-when-cross-origin',
  };
}

type ProductDetailsPageProps = {
  params: {
    category: string;
    productName: string;
  };
};

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const current_product_id = parseInt(params.productName.split("-")[0]);

  const { data: productsData, error: productError } = await supabase
    .from('products')
    .select('*, productimages!inner(image_url)')
    .eq('product_id', current_product_id)
    .single();

  if (productError || !productsData) {
    console.error('Error fetching product data:', productError);
    return <div>Error loading products.</div>;
  }

  const { data: reviewsData, error: reviewError } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', current_product_id);

  if (reviewError) {
    console.error('Error fetching reviews:', reviewError);
    return <div>Error loading products.</div>;
  }

  const { data: colorData, error: colorError } = await supabase
    .from('productcolors')
    .select('*')
    .eq('product_id', current_product_id);

  if (colorError) {
    console.error('Error fetching product colors:', colorError);
    return <div>Error loading products.</div>;
  }

  return (
    <div>
      <ProductDetails
        current_product_id={current_product_id}
        currentProduct={productsData}
        reviewsData={reviewsData}
        colorData={colorData}
      />
    </div>
  );
}
