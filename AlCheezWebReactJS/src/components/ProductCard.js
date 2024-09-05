import React from 'react';
import ImageSlider from './ImageSlider';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard(props) {
    const navigate = useNavigate();
    
    return (
        <div className='p-card_container'>
            <div className='p-card-image_container'>
                <ImageSlider slides={props.data.productimages} product_id={props.data.product_id} />
            </div>
            {props.data.sale_price ? 
            <div onClick={() => navigate(`/product-details/${props.data.product_id}`)}>
                <p className='product_name'>{props.data.name}</p>
                <p className='sale_price'>Rs. {props.data.sale_price}</p>
                <p className='p-original_price'>
                    <span className='line_through'>Rs. {props.data.price}</span> -{Math.round((props.data.price - props.data.sale_price) * 100 / props.data.price)}%
                </p>
            </div>
            :
            <div onClick={() => navigate(`/product-details/${props.data.product_id}`)}>
                <p className='product_name'>{props.data.name}</p>
                <p className='price'>Rs. {props.data.price}</p>
            </div>
            }
        </div>
    );
}
