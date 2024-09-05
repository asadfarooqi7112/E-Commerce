"use client";
import { useState } from 'react';
import ImageGallery from '@/components/ImageGallery';
import styles from "./ProductDetails.module.css";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DisplayReview from './DisplayReview';
import SubmitReview from './SubmitReview';
import Pagination from './Pagination';
import ImageSliderDetailsPage from './ImageSliderDetailsPage';
import { useRouter } from 'next/navigation';

interface ProductImage {
  image_url: string;
}

interface Review {
  rating: number;
  review_title: string;
  review_content: string;
  user_name: string;
  comment: string;
}

interface ColorData {
  color: string;
  product_id: number;
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  sale_price?: number;
  productimages: ProductImage[];
}

interface ProductDetailsProps {
  current_product_id: number;
  currentProduct: Product;
  reviewsData: Review[];
  colorData: ColorData[];
}

export default function ProductDetails({ current_product_id, currentProduct, reviewsData, colorData }: ProductDetailsProps) {
  const [isDescriptionShown, setIsDescriptionShown] = useState<boolean>(false);
  const [isShippingDetailsShown, setIsShippingDetailsShown] = useState<boolean>(false);
  const [isWriteReview, setIsWriteReview] = useState<boolean>(false);
  const [focusDiv, setFocusDiv] = useState<boolean>(false);

  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, emptyCart } = useShoppingCart();

  const [selectedColor, setSelectedColor] = useState<string>(colorData[0]?.color ?? "no color choice");
  const quantity = getItemQuantity(current_product_id, selectedColor);

  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  const router = useRouter()

  const totalRating = reviewsData.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0) / reviewsData.length;

  const reviewCount = [0, 0, 0, 0, 0];
  reviewsData.forEach((item) => {
    if (item.rating >= 1 && item.rating <= 5) {
      reviewCount[item.rating - 1] += 1;
    }
  });

  const ratingsToStars = Array(5).fill(0).map((_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {totalRating >= index + 1 ? (
          <FaStar color='orange' />
        ) : totalRating >= number ? (
          <FaStarHalfAlt color='orange' />
        ) : (
          <AiOutlineStar />
        )}
      </span>
    );
  });

  function handleAddToCart(id: number, color: string) {
    increaseCartQuantity(id, color);
  }

  function handleRemoveFromCart(id: number, color: string) {
    removeFromCart(id, color);
  }

  function handleBuyNow(id: number, color: string) {
    router.push('/check-out')
    emptyCart();
    increaseCartQuantity(id, color);
  }

  function handleColor(color: string) {
    setSelectedColor(color);
  }

  function handleIsWriteAReview() {
    setFocusDiv(true);
    setIsWriteReview(prev => !prev);
  }

  return (
    <div>
      <div className={styles.product_details_container}>
        {isSmallDevice
          ?
          <div className={styles.image_container}>
            <ImageSliderDetailsPage slides={currentProduct.productimages} />
          </div>
          :
          <div className={styles.image_container}>
            <ImageGallery images={currentProduct.productimages} />
          </div>}
        <div className={styles.product_info_container}>
          <div className={styles.product_header}>
            <h1 className={styles.product_title}>{currentProduct.name}</h1>
            <div>
              {ratingsToStars} {reviewsData.length} reviews
            </div>
            {currentProduct.sale_price ? (
              <p className={styles.product_price}>
                Rs. {currentProduct.sale_price}{' '}
                <span className={styles.original_price}>Rs. {currentProduct.price}</span> -{Math.round((currentProduct.price - currentProduct.sale_price) * 100 / currentProduct.price)}%
              </p>
            ) : (
              <p className={styles.product_price}>Rs. {currentProduct.price}</p>
            )}
          </div>
          {colorData !== undefined &&
            <div>
              <p>Color: {(selectedColor && selectedColor !== "") && (selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1).toLowerCase())}</p>
              <div className={styles.swatch_container}>
                {colorData.map((item, index) => item.product_id === current_product_id && (
                  <div
                    key={index}
                    onClick={() => handleColor(item.color)}
                    style={{ backgroundColor: item.color, outline: selectedColor === item.color ? '2px solid black' : '2px solid gray' }}
                    className={styles.swatch_style}
                  />
                ))}
              </div>
            </div>}
          <p className={styles.product_description}>Some description text goes here.</p>
          {cartItems.find(item => item.id === current_product_id && item.color === selectedColor) !== undefined &&
            <div className={styles.quantity_label}>Quantity:
              <div className={styles.decrement_quantity} onClick={() => decreaseCartQuantity(current_product_id, selectedColor)}>-</div>{quantity}<div className={styles.increment_quantity} onClick={() => increaseCartQuantity(current_product_id, selectedColor)}>+</div>
            </div>}
          <div className={styles.button_container}>
            {cartItems.find(item => item.color === selectedColor && item.id === current_product_id) === undefined
              ?
              <button style={{ backgroundColor: '#3f51b5' }} className={styles.button_style} onClick={() => { handleAddToCart(current_product_id, selectedColor) }}>Add to cart</button>
              :
              <button style={{ backgroundColor: '#c62828' }} className={styles.button_style} onClick={() => { handleRemoveFromCart(current_product_id, selectedColor) }}>Remove from cart</button>
            }
            <button style={{ backgroundColor: '#f0c040', color: '#000' }} className={styles.button_style} onClick={() => handleBuyNow(current_product_id, selectedColor)}>Buy Now</button>
          </div>
          <div className={styles.dropdown_container}>
            <div className={styles.dropdown_header} onClick={() => setIsDescriptionShown(prev => !prev)}>
              <p className={styles.dropdown_title}>Description</p>
              <span className={styles.dropdown_arrow}>{isDescriptionShown ? '⮝' : '⮟'}</span>
            </div>
            {isDescriptionShown && <div className={styles.dropdown_content} dangerouslySetInnerHTML={{ __html: currentProduct.description }} />}
          </div>
          <div className={styles.dropdown_container}>
            <div className={styles.dropdown_header} onClick={() => setIsShippingDetailsShown(prev => !prev)}>
              <p className={styles.dropdown_title}>Shipping Information</p>
              <span className={styles.dropdown_arrow}>{isShippingDetailsShown ? '⮝' : '⮟'}</span>
            </div>
            {isShippingDetailsShown && (
              <p className={styles.dropdown_content}>
                <p><strong>Delivery Charges:</strong></p>
                <p>The delivery charges are Rs 200.</p>
                <p><strong>Delivery Timings:</strong></p>
                <p>4-5 working days.</p>
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <DisplayReview 
          handleIsWriteAReview={handleIsWriteAReview} 
          isWriteReview={isWriteReview} 
          reviewsData={reviewsData} 
          totalRating={totalRating} 
          reviewCount={reviewCount} 
          ratingsToStars={ratingsToStars} 
        />
      </div>
      {isWriteReview &&
        <div>
          <SubmitReview 
            product_id={current_product_id} 
            setIsWriteReview={setIsWriteReview} 
            focusDiv={focusDiv} 
            setFocusDiv={setFocusDiv} 
          />
        </div>}
      {reviewsData.length !== 0 && <Pagination data={reviewsData} />}
    </div>
  );
}
