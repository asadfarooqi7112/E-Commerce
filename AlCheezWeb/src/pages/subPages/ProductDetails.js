import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '../../components/ImageGallery';
import SubmitReview from '../../components/SubmitReview';
import DisplayReview from '../../components/DisplayReview';
import { supabase } from '../../supabaseClient';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import Pagination from '../../components/Pagination';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import "./ProductDetails.css"
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ImageSlider from '../../components/ImageSlider';
import { useProductsContext } from '../../context/ProductsContext';
import Loading from "../../components/Loading"

const ProductDetails = (props) => {
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);
  const [isShippingDetailsShown, setIsShippingDetailsShown] = useState(false);
  const [isWriteReview, setIsWriteReview] = useState(false)
  const [reviewsData, setReviewsData] = useState([]);

  const [focusDiv, setFocusDiv] = useState(false);
  const params = useParams();

  const [totalRating, setTotalRating] = useState(0);
  const [reviewCount, setReviewCount] = useState([0, 0, 0, 0, 0]);

  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems,emptyCart} = useShoppingCart();

  const navigate = useNavigate();
  const {productColors} = useProductsContext()

  const defaultColor = productColors.find(item=>(item.product_id===parseInt(params.id)))
  const [selectedColor, setSelectedColor] = useState(defaultColor ? defaultColor.color: "no color choice");

  const quantity = getItemQuantity(params.id, selectedColor)

  const isSmallDevice = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
      async function fetchReviews() {
          const { data } = await supabase
              .from('reviews')
              .select('*')
              .eq('product_id', params.id);

          if (data) {
              setReviewsData(data);

              const total = data.reduce((accumulator, currentReview) => accumulator + currentReview.rating, 0);
              setTotalRating(total / data.length);

              const counts = [0, 0, 0, 0, 0];
              data.forEach((item) => {
                  if (item.rating >= 1 && item.rating <= 5) {
                      counts[item.rating - 1] += 1;
                  }
              });

              setReviewCount(counts);
          }
      }

      fetchReviews();
  }, [params.id]);

  const ratingsToStars = Array(5).fill(0).map((item, index) => {
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


console.log("updated",cartItems)

  function handleIsWriteAReview(){
    setFocusDiv(true)
    setIsWriteReview(prev=>!prev)
  }
  function handleAddToCart(id, color){
    increaseCartQuantity(id,color) 
  }
  function handleRemoveFromCart(id, color){
    removeFromCart(id, color)
  }
  function handleBuyNow(id, color){
    emptyCart()
    increaseCartQuantity(id,color)
    navigate('/checkout');
  }
  function handleColor(color){
    setSelectedColor(color)
  }
  const product = props.productsData.find(item => item.product_id === parseInt(params.id));

  if (!product) {
    return <Loading/>;
  }

  return (
    <div className='product_details_page_container '>
    <div className='product_details_container'>
      {isSmallDevice 
      ? 
      <div className='p-details-image_container'>
          <ImageSlider slides={product.productimages} product_id={product.product_id} />
      </div>:
      <div className='image_container'>
        <ImageGallery images={product.productimages} />
      </div>}
      <div className='product_info_container'>
        <div className='product_header'>
          <h1 className='product_title'>{product.name}</h1>
          <div>
                {ratingsToStars} {reviewsData.length} reviews
          </div>
          {product.sale_price ? (
            <p className='product_price'>
              Rs. {product.sale_price}{' '}
              <span className='original_price'>Rs. {product.price}</span> -{Math.round((product.price - product.sale_price) * 100 / product.price)}%
            </p>
          ) : (
            <p className='product_price'>Rs. {product.price}</p>
          )}
        </div>
        {productColors !==undefined &&<div>
          <p>Color: {selectedColor !=="" && (selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1).toLowerCase())}</p>
          <div className='swatch_container'>
            {productColors.map((item,index) => item.product_id===parseInt(params.id) &&(
              <div
                key={index}
                onClick={() => handleColor(item.color)}
                style={{backgroundColor: item.color, outline: selectedColor === item.color ? '2px solid black' : '2px solid gray'}}
                className='swatch_style'
              />
            ))}
          </div>
        </div>}
        <p className='product_description'>Some description text goes here.</p>
        {cartItems.find(item=>item.id===parseInt(params.id)&&item.color===selectedColor)!== undefined  && <div className='quantity_label'>Quantity:<div className='decrement_quantity' onClick={()=>decreaseCartQuantity(params.id, selectedColor)}>-</div>{quantity}<div className='increment_quantity' onClick={()=>increaseCartQuantity(params.id,selectedColor)}>+</div></div>
        }<div className='button_container'>
          {cartItems.find(item=>item.color===selectedColor && item.id===parseInt(params.id))===undefined
          ?
          <button style={{backgroundColor: '#3f51b5' }} className='button_style ' onClick={()=>{handleAddToCart(params.id, selectedColor)}}>Add to cart</button>
          :
          <button style={{backgroundColor: '#c62828' }} className='button_style ' onClick={()=>{handleRemoveFromCart(params.id, selectedColor)}}>Remove from cart</button>
        }
          <button style={{backgroundColor: '#f0c040', color: '#000' }} className='button_style ' onClick={()=>handleBuyNow(params.id, selectedColor)}>Buy Now</button>
        </div>
        <div className='dropdown_container'>
          <div className='dropdown_header' onClick={() => setIsDescriptionShown(prev => !prev)}>
            <p className='dropdown_title'>Description</p>
            <span className='dropdown_arrow'>{isDescriptionShown ? '⮝' : '⮟'}</span>
          </div>
          {isDescriptionShown && <div className='dropdown_content' dangerouslySetInnerHTML={{ __html: product.description }} />}
        </div>
        <div className='dropdown_container'>
          <div className='dropdown_header' onClick={() => setIsShippingDetailsShown(prev => !prev)}>
            <p className='dropdown_title'>Shipping Information</p>
            <span className='dropdown_arrow'>{isShippingDetailsShown ? '⮝' : '⮟'}</span>
          </div>
          {isShippingDetailsShown && (
            <p className='dropdown_content'>
              <p><strong>Delivery Charges:</strong></p>
              <p>The delivery charges are Rs 200.</p>
              <p><strong>Delivery Timings:</strong></p>
              <ul>
                <li>For Lahore - 2-3 working days.</li>
                <li>Outside Lahore - 3-5 working days.</li>
              </ul>
            </p>
          )}
        </div>
      </div>
      
    </div>
      <div>
        <DisplayReview handleIsWriteAReview={handleIsWriteAReview} isWriteReview={isWriteReview} reviewsData={reviewsData} totalRating={totalRating} reviewCount={reviewCount} ratingsToStars={ratingsToStars} />
      </div>
      {isWriteReview && <div>
        <SubmitReview product_id={product.product_id} setIsWriteReview= {setIsWriteReview} focusDiv={focusDiv} setFocusDiv={setFocusDiv} />
      </div>}
      {reviewsData.length !==0 && <Pagination data = {reviewsData}/>}
    </div>
  );
};

export default ProductDetails;
