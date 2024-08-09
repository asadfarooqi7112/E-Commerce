import React from "react";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Electronics from "./pages/Electronics";
import TrackOrder from "./pages/TrackOrder";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/subPages/ProductDetails";
import SearchResult from "./pages/subPages/SearchResult";
import NotFound from "./pages/NotFound"; //

import CheckOut from "./pages/subPages/CheckOut";

import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import {useProductsContext } from './context/ProductsContext';

import OrderComplete from "./pages/subPages/OrderComplete";
import ScrollToTop from "./components/ScrollToTop";

import Headsets from "./pages/subPages/Headsets";
import Speakers from "./pages/subPages/Speakers"
import PowerBanks from "./pages/subPages/PowerBanks"
import SmartWatches from "./pages/subPages/SmartWatches"
import ChargerCables from "./pages/subPages/ChargerCables"
import MobileLaptopStands from "./pages/subPages/MobileLaptopStands"



function App() {
  const {productsData} = useProductsContext();

  return (
    <ShoppingCartProvider>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element = {<Home productsData = {productsData}/>} />
          <Route path="/electronics" element = {<Electronics productsData = {productsData}/>} />
          <Route path="/electronics/headsets" element={<Headsets/>}/>
          <Route path="/electronics/speakers" element={<Speakers/>}/>
          <Route path="/electronics/power-banks" element={<PowerBanks/>}/>
          <Route path="/electronics/smart-watches" element={<SmartWatches/>}/>
          <Route path="electronics/chargers-cables" element={<ChargerCables/>}/>
          <Route path="electronics/mobile-laptop-stands" element={<MobileLaptopStands/>}/>


          <Route path="/track-order" element = {<TrackOrder/>} />
          <Route path="/contact-us" element = {<ContactUs/>} />
          <Route path="/checkout" element = {<CheckOut />} />
          <Route path="/product-details/:id" element={<ProductDetails productsData = {productsData}/>} />
          <Route path="/search-result" element = {<SearchResult />}/>
          <Route path="/order-complete" element = {<OrderComplete />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </ShoppingCartProvider>
  );
}

export default App;


