"use client"

import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CheckOut.css';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import CheckoutItems from '../../components/CheckoutItems';
import { useProductsContext } from '../../context/ProductsContext';
import { supabase } from '../../lib/supabaseClient';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

interface FormData {
  contact: string;
  fullName: string;
  fullAddress: string;
  city: string;
  postalCode: string;
  phone: string;
  country: string;
}



export default function CheckOut() {
  const DeliverCharges = 200;
  const { cartItems, emptyCart } = useShoppingCart();
  const { productsData } = useProductsContext();
  const [useSameAddress, setUseSameAddress] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const [formData, setFormData] = useState<FormData>({
    contact: '',
    fullName: '',
    fullAddress: '',
    city: '',
    postalCode: '',
    phone: '',
    country: 'Pakistan',
  });

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseSameAddress(e.target.value === 'same');
  };

  const handleDivClick = (value: string) => {
    setUseSameAddress(value === 'same');
  };

  const Subtotal = useMemo(() => {
    return cartItems.reduce((total, cartItem) => {
      const item = productsData.find((item) => item.product_id === cartItem.id);
      return total + ((item?.sale_price ?? item?.price) || 0) * cartItem.quantity;
    }, 0);
  }, [cartItems, productsData]);

  const Total = Subtotal + DeliverCharges;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.getElementById("checkoutForm") as HTMLFormElement;

    if (form.reportValidity()) { 
      setLoading(true);
      try {
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .insert([{
            name: formData.fullName,
            contact: formData.contact,
            phone: formData.phone,
            address: formData.fullAddress,
            city: formData.city,
            zip_code: formData.postalCode,
            country: formData.country,
          }])
          .select('customer_id')
          .single();

        if (customerError) {
          console.error('Error creating customer:', customerError);
          setLoading(false);
          return;
        }
        
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([{
            customer_id: customer.customer_id,
            total_amount: Total,
            payment_method: 'Cash on Delivery',
            order_status: 'pending',
          }])
          .select('order_id')
          .single();

        if (orderError) {
          console.error('Error creating order:', orderError);
          setLoading(false);
          return;
        }

        const orderItems = cartItems.map((cartItem) => {
          const item = productsData.find((item) => item.product_id === cartItem.id);
          return {
            order_id: order.order_id,
            product_id: item!.product_id,
            quantity: cartItem.quantity,
            color: cartItem.color,
            price: item!.sale_price ? item!.sale_price : item!.price,
          };
        });

        const { error: orderItemsError } = await supabase
          .from('ordereditems')
          .insert(orderItems);

        if (orderItemsError) {
          console.error('Error creating order items:', orderItemsError);
        } else {
          emptyCart();
          router.push('/check-out/complete-order');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isMounted) {
    return <Loading/>
  }

  return (
    <div className="checkoutpage_container">
      {loading && <div className="loading_overlay"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>}
      <form className='customer-details_container' id="checkoutForm" onSubmit={handleSubmit}>
        <div>
          <h1>Contact</h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control input-field"
              id="contact"
              placeholder=" "
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <label htmlFor="contact">Email or Phone Number</label>
          </div>
        </div>
        <h1>Shipping Address</h1>
        <ShippingDetail formData={formData} handleChange={handleChange} />
        <div>
          <h1>Shipping Method</h1>
          <div className="input-field" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#f0f8ff" }}>
            <span>Standard</span> <span>Rs {DeliverCharges}</span>
          </div>
        </div>
        <div>
          <h1>Payment Method</h1>
          <div className="input-field" style={{ backgroundColor: "#f0f8ff" }}>
            Cash on delivery (COD)
          </div>
        </div>
        <h1>Billing Address</h1>
        <div
          className={`form-check input-field ${useSameAddress ? 'selected' : ''}`}
          style={{ paddingLeft: "40px" }}
          onClick={() => handleDivClick('same')}>
          <input
            type="radio"
            className="form-check-input"
            id="sameAddress"
            name="billingAddress"
            value="same"
            checked={useSameAddress}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="sameAddress">
            Same as shipping address
          </label>
        </div>
        <div
          className={`form-check input-field ${!useSameAddress ? 'selected' : ''}`}
          style={{ paddingLeft: "40px" }}
          onClick={() => handleDivClick('different')}>
          <input
            type="radio"
            className="form-check-input"
            id="differentAddress"
            name="billingAddress"
            value="different"
            checked={!useSameAddress}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="differentAddress">
            Use a different billing address
          </label>
        </div>
        {!useSameAddress && (
          <ShippingDetail formData={formData} handleChange={handleChange} />
        )}
        {!isSmallDevice && <button form="checkoutForm" type="submit" className="btn btn-secondary" style={{ width: "100%", height: "50px", marginTop: "30px" }}>
            Complete Order
        </button>}
      </form>
      <div className='checkout-item_container'>
        {cartItems.map((item, index: number) =>
          (<CheckoutItems key={index} {...item}/>)
        )}
        {cartItems.length !== 0 && <div className='subtotal-container'>
          <span>Subtotal: </span> <span>Rs {Subtotal}</span>
        </div>}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Shipping Charges: </span><span>Rs {DeliverCharges}</span>
        </div>
        <div className='ms-auto fw-bold fs-5' style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Total:</span><span>Rs {Total.toFixed(2)}</span>
        </div>
      </div>  
      {isSmallDevice && <button form="checkoutForm" type="submit" className="btn btn-secondary" style={{ width: "100%", height: "50px" }}>
            Complete Order
        </button>}
    </div>
  );
}

const shippingAddressContainer: React.CSSProperties = {
  position: "relative",
  margin: "20px 0",
};

interface ShippingDetailProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function ShippingDetail({ formData, handleChange }: ShippingDetailProps) {
  return (
    <div style={shippingAddressContainer}>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control input-field"
          id="fullName"
          placeholder=" "
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <label htmlFor="fullName">Full Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control input-field"
          id="fullAddress"
          placeholder=" "
          value={formData.fullAddress}
          onChange={handleChange}
          required
        />
        <label htmlFor="fullAddress">Address</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control input-field"
          id="city"
          placeholder=" "
          value={formData.city}
          onChange={handleChange}
          required
        />
        <label htmlFor="city">City</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control input-field"
          id="postalCode"
          placeholder=" "
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        <label htmlFor="postalCode">Postal Code</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control input-field"
          id="phone"
          placeholder=" "
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Phone Number</label>
      </div>
      <div className="form-floating mb-3">
        <select
          className="form-select input-field"
          id="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="Pakistan">Pakistan</option>
          {/* Add other countries as needed */}
        </select>
        <label htmlFor="country">Country</label>
      </div>
    </div>
  );
}
