"use client";

import "./Home.css";
import { useMediaQuery } from "../hooks/useMediaQuery";

import ProductCard from './ProductCard';
import RotatingAds from "./RotatingAds";

import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import Link from "next/link";

// Define the types for the product data
interface ProductData {
  product_id: number;
  name: string;
  description: string;
  price: number;
  sale_price: number;
  stock: number;
  category_id: number;
  productimages: { image_url: string }[]; // Adjusted to include product images
}

// Define the types for the Home component props
interface HomeProps {
  productsData: ProductData[];
}

export default function Home(props: HomeProps) {
  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  const imageArray: { url: string }[] = [
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Bigger-Screen-Ad.png?t=2024-07-28T16%3A41%3A48.294Z" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Bigger-Screen-Ad.png" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Bigger-Screen-Ad.png" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Bigger_Screen-Ad.png" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Bigger-Screen-Ad.png" }
  ];

  const imageArraySmallDevices: { url: string }[] = [
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Smaller-Screen-Ad.png" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Smaller-Screen-Ad.png" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Smaller-Screen-Ad.png" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Smaller-Screen-Ad.png?t=2024-07-28T16%3A43%3A53.926Z" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Smaller-Screen-Ad.png" },
    { url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Smaller-Screen-Ad.png" },
  ];

  const headsetsCardsArray = props.productsData.filter((item) => item.category_id === 1).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const speakersCardsArray = props.productsData.filter((item) => item.category_id === 2).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const smartWatchesCardsArray = props.productsData.filter((item) => item.category_id === 3).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const powerBanksCardsArray = props.productsData.filter((item) => item.category_id === 4).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const chargersCardsArray = props.productsData.filter((item) => item.category_id === 5).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const standsCardsArray = props.productsData.filter((item) => item.category_id === 6).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const proctectsAndCablesCardsArray = props.productsData.filter((item) => item.category_id === 7).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));

  const openWhatsApp = (): void => {
    const phoneNumber = '923468576853'; // replace with the actual phone number
    const message = encodeURIComponent('Hello, I am interested in your products.'); // replace with your pre-written text
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  }

  return (
    <div className='home_container'>
      <>
      <div className='whatsapp-icon'>
        <FaWhatsapp size={40} color="#25D366" onClick={openWhatsApp}/>
      </div>
      <div style={isSmallDevice ? intro_container_smaller_devices : intro_container}>
        <RotatingAds slides={isSmallDevice ? imageArraySmallDevices : imageArray} parentWidth={98.70}/>
      </div>
      <div className='home-our-products_container'>
        <h1>Our Products</h1>
        <div className= 'our-products-image-title_container'>
          <Link href="/electronics/headsets">
            <div className='our-products-single-image-title'>
              <Image src="/images/headset-logo.png" width={100} height={200} className='our-products-image' alt='headset icon'/>
              <p style={{textAlign:"center"}}>Headsets</p>
            </div>
          </Link>
          <Link href="/electronics/speakers">
            <div className='our-products-single-image-title'>
              <Image src="/images/speaker-logo.png" width={100} height={200} className='our-products-image' alt='speaker icon'/>
              <p style={{textAlign:"center"}}>Speakers</p>
            </div>
          </Link>
          <Link href="/electronics/power-banks">
            <div className='our-products-single-image-title'>
              <Image src="/images/powerBanks-logo.png" width={100} height={200} className='our-products-image' alt='power bank icon'/>
              <p style={{textAlign:"center"}}>Power Banks</p>
            </div>
          </Link>
          <Link href="/electronics/smart-watches">
            <div className='our-products-single-image-title'>
              <Image src="/images/SmartWatch-logo.png" width={100} height={200} className='our-products-image' alt='smart watch icon'/>
              {isSmallDevice ? <p style={{textAlign:"center"}}>Smart <br/>Watches</p> : <p style={{textAlign:"center"}}>Smart Watches</p>}
            </div>
          </Link>
          <Link href="/electronics/chargers-cables">
            <div className='our-products-single-image-title'>
              <Image src="/images/charger-cable-logo.png" width={100} height={200} className='our-products-image' alt='charger & cable icon'/>
              {isSmallDevice ? <p style={{textAlign:"center"}}>Chargers &<br/> Cables</p> : <p style={{textAlign:"center"}}>Chargers & Cables</p>}
            </div>
          </Link>
          <Link href="/electronics/mobile-laptop-stands">
            <div className='our-products-single-image-title'>
              <Image src="/images/mobile-laptop-stand-logo.png" width={100} height={200} className='our-products-image' alt='mobile & laptop icon'/>
              {isSmallDevice ? <p style={{textAlign:"center"}}>Mobile &<br/> Laptop<br/> Stands</p> : <p style={{textAlign:"center"}}>Mobile & Laptop Stands</p>}
            </div>
          </Link>
        </div>
      </div>
      <div className='headsets_container'>
        <h1>Headsets</h1>
        <div className='card_container'>
          {headsetsCardsArray}
          <Link href="/electronics/headsets" style={{alignSelf: "center"}}>
            <button className='view-all_button'>VIEW All</button>
          </Link>
        </div>
      </div>
      <div className='speakers_container'>
        <h1>Speakers</h1>
        <div className='card_container'>
          {speakersCardsArray}
          <Link href="/electronics/speakers" style={{alignSelf: "center"}}>
            <button className='view-all_button'>VIEW All</button>
          </Link>
        </div>
      </div>
      <div className='smart-watches_container'>
        <h1>Smart Watches</h1>
        <div className='card_container'>
          {smartWatchesCardsArray}
          <Link href="/electronics/smart-watches" style={{alignSelf: "center"}}>
            <button className='view-all_button'>VIEW All</button>
          </Link>
        </div>
      </div>
      <div className='power-banks_container'>
        <h1>Power Banks</h1>
        <div className='card_container'>
          {powerBanksCardsArray}
          <Link href="/electronics/power-banks" style={{alignSelf: "center"}}>
            <button className='view-all_button'>VIEW All</button>
          </Link>
        </div>
      </div>
      <div className='chargers_container'>
        <h1>Chargers & Cables</h1>
        <div className='card_container'>
          {chargersCardsArray}
          <Link href="/electronics/chargers-cables" style={{alignSelf: "center"}}>
            <button className='view-all_button'>VIEW All</button>
          </Link>
        </div>
      </div>
      <div className='stands_container'>
        <h1>Stands</h1>
        <div className='card_container'>
          {standsCardsArray}
          <Link href="/electronics/mobile-laptop-stands" style={{alignSelf: "center"}}>
            <button className='view-all_button'>VIEW All</button>
          </Link>
        </div>
      </div>
      <div className='protects-and-cables_container'>
        <h1>Protects & Cables</h1>
        <div className='card_container'>
          {proctectsAndCablesCardsArray}
          <Link href="/electronics/protects-and-cables" style={{alignSelf: "center"}}>
            <button className='view-all_button'>VIEW All</button>
          </Link>
        </div>
      </div>
      </>
    </div>
  )
}

const intro_container = {
  height: "80vh",
  width: "98.70vw",
  marginTop: "10px",
  marginBottom: "10px"
};

const intro_container_smaller_devices = {
  height: "50vh",
  width: "98.70vw",
  marginTop: "0px",
  marginBottom: "10px"
};
