import React from 'react'

import "./Home.css"
import { useMediaQuery } from "../hooks/useMediaQuery";

import ProductCard from '../components/ProductCard';
import RotatingAds from "../components/RotatingAds";
import { useNavigate } from 'react-router-dom';

import { FaWhatsapp } from 'react-icons/fa';

import headsetsLogo from "../images/headset-logo-removebg-preview.png"
import powerBankLogo from "../images/powerBanks-logo-removebg-preview.png"
import speakerLogo from "../images/speaker-logo-removebg-preview (1).png"
import smartWatchLogo from "../images/SmartWatchLogo2-removebg-preview (1).png"
import chargerCableLogo from "../images/charger-cable-logo-removebg-preview.png"
import mobileLaptopStandLogo from "../images/mobile-laptop-stand-logo-removebg-preview.png"

import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';

export default function Home(props) {
  const navigate = useNavigate()
  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  const imageArray = [
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Bigger-Screen-Ad.png"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Bigger-Screen-Ad.png?t=2024-07-28T16%3A41%3A48.294Z"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Bigger-Screen-Ad.png"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Bigger-Screen-Ad.png"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Bigger_Screen-Ad.png"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Bigger-Screen-Ad.png"}
  ];

  const imageArraySmallDevices = [
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Headset-Smaller-Screen-Ad.png"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Speaker-Smaller-Screen-Ad.png"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Power-Bank-Smaller-Screen-Ad.png"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Smart-Watch-Smaller-Screen-Ad.png?t=2024-07-28T16%3A43%3A53.926Z"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Chargers-Smaller-Screen-Ad.png"},
    {url: "https://vqvruapmkpjwdrrhnzfr.supabase.co/storage/v1/object/public/product_images/AdImages/Stands-Smaller-Screen-Ad.png"},
  ]

  const headsetsCardsArray = props.productsData.filter((item) => item.category_id === 1).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const speakersCardsArray = props.productsData.filter((item) => item.category_id === 2).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const smartWatchesCardsArray = props.productsData.filter((item) => item.category_id === 3).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const powerBanksCardsArray = props.productsData.filter((item) => item.category_id === 4).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const chargersCardsArray = props.productsData.filter((item) => item.category_id === 5).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const standsCardsArray = props.productsData.filter((item) => item.category_id === 6).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));
  const proctectsAndCablesCardsArray = props.productsData.filter((item) => item.category_id === 7).slice(0, 9).map((item, index) => (<ProductCard key={index} data={item} />));

  const openWhatsApp = () => {
    const phoneNumber = '923468576853'; // replace with the actual phone number
    const message = encodeURIComponent('Hello, I am interested in your products.'); // replace with your pre-written text
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  }
  return (
    <div className='home_container'>
      <Helmet>
        <html lang="en" />
        <title>Home | AlCheez</title>
        <meta name="description" content="Welcome to AlCheez, your one-stop shop for the latest electronics, gadgets, and tech accessories. Explore our wide range of products today!" />
        <link rel="canonical" href="https://alcheez.com/" />
        <meta name="keywords" content="alcheez, electronics, headset, headphone, handsfree, earphone, airpods, earbuds, speaker, smart watch, charger, cable, mobile stand, laptop stand, power bank, tech accessories, online electronics store" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        {/* https://ogp.me/ */}
        <meta property="og:url" content="https://alcheez.com/" />
        <meta property="og:title" content="AlCheez Online Store" />
        <meta property="og:description" content="Shop the latest electronics, gadgets, and tech accessories at AlCheez. Discover unbeatable prices and top-quality products today!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://alcheez.com/android-chrome-384x384.png" />

        {/* Twitter tags */}
        {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="AlCheez Online Store" />
        <meta property="twitter:description" content="Check out the latest electronics, gadgets, and tech accessories at AlCheez. Your trusted online store for all things tech!" />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://alcheez.com/android-chrome-384x384.png" />

        {/* https://moz.com/blog/meta-referrer-tag */}
        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>
      {headsetsCardsArray.length>0
      ?
      <>
      <div className='whatsapp-icon'>
        <FaWhatsapp size={40} color="#25D366" onClick={openWhatsApp}/>
      </div>
      <div style={isSmallDevice?intro_container_smaller_devices:intro_container}>
        {<RotatingAds slides={isSmallDevice?imageArraySmallDevices:imageArray} parentWidth={98.70}/>}
      </div>
      <div className='home-our-products_container'>
        <h1>Our Products</h1>
        <div className= 'our-products-image-title_container'>
          <div className='our-products-single-image-title' onClick={()=>navigate("electronics/headsets")}>
            <img src={headsetsLogo} className='our-products-image' alt='heatset icon'/>
            <p style={{textAlign:"center"}}>Headsets</p>
          </div>
          <div className='our-products-single-image-title' onClick={()=>navigate("electronics/speakers")}>
            <img src={speakerLogo} className='our-products-image' alt='speaker icon'/>
            <p style={{textAlign:"center"}}>Speakers</p>
          </div>
          <div className='our-products-single-image-title' onClick={()=>navigate("electronics/power-banks")}>
            <img src={powerBankLogo} className='our-products-image' alt='power bank icon'/>
            <p style={{textAlign:"center"}}>Power Banks</p>
          </div>
          <div className='our-products-single-image-title' onClick={()=>navigate("electronics/smart-watches")}>
            <img src={smartWatchLogo} className='our-products-image' alt='smart watch icon'/>
            {isSmallDevice?<p style={{textAlign:"center"}}>Smart <br/>Watches</p>:<p style={{textAlign:"center"}}>Smart Watches</p>}
          </div>
          <div className='our-products-single-image-title' onClick={()=>navigate("electronics/chargers-cables")}>
            <img src={chargerCableLogo} className='our-products-image' alt='charger & cable icon'/>
            {isSmallDevice?<p style={{textAlign:"center"}}>Chargers &<br/> Cables</p>:<p style={{textAlign:"center"}}>Chargers & Cables</p>}
          </div>
          <div className='our-products-single-image-title' onClick={()=>navigate("electronics/mobile-laptop-stands")}>
            <img src={mobileLaptopStandLogo} className='our-products-image' alt='mobile & laptop icon'/>
            {isSmallDevice?<p style={{textAlign:"center"}}>Mobile &<br/> Laptop<br/> Stands</p>:<p style={{textAlign:"center"}}>Mobile & Laptop Stands</p>}
          </div>
        </div>
      </div>
      <div className='headsets_container'>
        <h1>Headsets</h1>
        <div className='card_container'>
          {headsetsCardsArray}
          <button className='view-all_button' onClick={()=>navigate("electronics/headsets")}>VIEW All</button>
        </div>
      </div>
      <div className='speakers_container'>
        <h1>Speakers</h1>
        <div className='card_container'>
          {speakersCardsArray}
          <button className='view-all_button' onClick={()=>navigate("electronics/speakers")}>VIEW ALL</button>
        </div>
      </div>
      <div className='power-banks_container'>
        <h1>Power Banks</h1>
        <div className='card_container'>
          {powerBanksCardsArray}
          <button className='view-all_button' onClick={()=>navigate("electronics/power-banks")}>VIEW ALL</button>
        </div>  
      </div>
      <div className='smart-watches_container'>
        <h1>Smart Watches</h1>
        <div className='card_container'>
          {smartWatchesCardsArray}
          <button className='view-all_button ' onClick={()=>navigate("electronics/smart-watches")}>VIEW ALL</button>
        </div> 
      </div>
      <div className='chargers-cables_container'>
        <h1>Chargers & Cables</h1>
        <div className='card_container'>
          {chargersCardsArray}
          <button className='view-all_button ' onClick={()=>navigate("electronics/chargers-cables")}>VIEW ALL</button>
        </div> 
      </div>
      <div className='mobile-laptop-stands_container'>
        <h1>Mobile & Laptop Stands</h1>
        <div className='card_container'>
          {standsCardsArray}
          <button className='view-all_button' onClick={()=>navigate("electronics/mobile-laptop-stands")}>VIEW ALL</button>
        </div> 
      </div>
      <div className='smart-watches_container'>
        <h1>Protectors & Covers</h1>
        <div className='card_container'>
          {proctectsAndCablesCardsArray}
          <button className='view-all_button '>VIEW ALL</button>
        </div> 
      </div>
      </>:
      <Loading/>}
  </div>
  )
}

const intro_container={
  height: "80vh",
  width: "98.70vw",
  marginTop: "10px",
  marginBottom: "10px"
}
const intro_container_smaller_devices={
  height: "50vh",
  width: "98.70vw",
  marginTop: "0px",
   marginBottom: "10px"
}