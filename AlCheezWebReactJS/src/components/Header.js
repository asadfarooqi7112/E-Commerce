import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Offcanvas } from 'react-bootstrap';
import './Header.css';
import HamburgerButton from './HamburgerButton';
import SearchBar from './SearchBar';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BsCart } from 'react-icons/bs';
import FreeShippingBanner from './FreeShippingBanner';

import logo from "../images/logo for web.png"

export default function Header() {
  const { openCart, cartQuantity } = useShoppingCart();
  const [sideMenu, setSideMenu] = useState(false);
  const [isElectronicsSubMenu, setIsElectronicsSubMenu] = useState(false);

  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  function handleSubMenu(e){
    setIsElectronicsSubMenu(prev=>!prev)
  }

  return (
    <div>
      {!isSmallDevice ? (
        <>
        <FreeShippingBanner/>
        <div className='header_container'>
          <Link to="/" className='header_title'><img src={logo} style={{width: "50px",height:"50px"}} alt='site-logo'/>ALCHEEZ</Link>
          <SearchBar />
          <ul className='nav_list'>
            <li>
              <NavLink to="/" className="nav_item">Home</NavLink>
            </li>
            <li>
              <NavLink
                to="/electronics"
                className="nav_item"
                onMouseOver={() => setIsElectronicsSubMenu(true)}
                onMouseLeave={() => setIsElectronicsSubMenu(false)}
                onClick={() => setIsElectronicsSubMenu(false)}
              >
                Electronics <FiChevronDown />
              </NavLink>
              {isElectronicsSubMenu && (
                <div
                  className='electronics_sub_menu'
                  onMouseOver={() => setIsElectronicsSubMenu(true)}
                  onMouseLeave={() => setIsElectronicsSubMenu(false)}
                  onClick={() => setIsElectronicsSubMenu(false)}
                >
                  <NavLink to="/electronics/headsets" className="sub_menu_item">Headsets</NavLink>
                  <NavLink to="/electronics/speakers" className="sub_menu_item">Speakers</NavLink>
                  <NavLink to="/electronics/power-banks" className="sub_menu_item">Power Banks</NavLink>
                  <NavLink to="/electronics/smart-watches" className="sub_menu_item">Smart Watches</NavLink>
                  <NavLink to="/electronics/chargers-cables" className="sub_menu_item">Chargers & Cables</NavLink>
                  <NavLink to="/electronics/mobile-laptop-stands" className="sub_menu_item">Mobile & Laptop Stands</NavLink>
                </div>
              )}
            </li>
          {/*  <li>
              <NavLink to="/track-order" className="nav_item">Track Order</NavLink>
            </li>*/}
            <li>
              <NavLink to="/contact-us" className="nav_item">Contact Us</NavLink>
            </li>
          </ul>
          <button className='cart-button' onClick={openCart}>
            <BsCart color='black' size={30}/>
            {cartQuantity !== 0 && <div className='cart-item-counter'>{cartQuantity}</div>}
          </button>
        </div>
        </>
      ) : (
        <>
        <FreeShippingBanner/>
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#F5F5F5", paddingBottom: "10px" }}>
          <div className='header_container_smaller_devices'>
            <div onClick={() => setSideMenu(true)}>
              <HamburgerButton />
            </div>
            <Link to="/" className='header_title_smaller_devices'><img src={logo} style={{width: "40px",height:"40px"}} alt='site-logo'/>ALCHEEZ</Link>
            <button className='cart-button-smaller-devices' onClick={openCart}>
              <BsCart color='black' size={20}/>
              {cartQuantity !== 0 && <div className='cart-item-counter-smaller-devices'>{cartQuantity}</div>}
            </button>
            <Offcanvas show={sideMenu} onHide={() => setSideMenu(false)} style={{ width: "250px" }}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className='nav_list_smaller_devices'>
                  <li onClick={()=>setSideMenu(false)}>
                    <NavLink to="/" className="nav_item_smaller_devices">Home</NavLink>
                  </li>
                  <hr style={{ margin: "0px" }} />
                  <li>
                  <div style={{display:"flex", justifyContent: "space-between", alignItems: "center"}}>
                    <NavLink
                      to="/electronics"
                      className="nav_item_smaller_devices"
                      onClick={()=>setSideMenu(false)}
                    >
                      Electronics
                    </NavLink>
                      <div
                        style={{
                          border: "none",
                          borderLeft: "1px solid gray",
                          height: "25px",
                          margin: "0px",
                          marginRight: "20px",
                          marginLeft: "auto",
                        }}
                      ></div>
                      {isElectronicsSubMenu ? <FiChevronUp onClick={handleSubMenu}/> : <FiChevronDown onClick={handleSubMenu}/>}
                      </div>
                    <div className={`electronics_sub_menu_smaller ${isElectronicsSubMenu ? 'show' : ''}`} onClick={()=>setSideMenu(false)}>
                      <NavLink to="/electronics/headsets" className="sub_menu_item_smaller" style={{marginTop: "10px"}}>Headsets</NavLink>
                      <NavLink to="/electronics/speakers" className="sub_menu_item_smaller">Speakers</NavLink>
                      <NavLink to="/electronics/power-banks" className="sub_menu_item_smaller">Power Banks</NavLink>
                      <NavLink to="/electronics/smart-watches" className="sub_menu_item_smaller">Smart Watches</NavLink>
                      <NavLink to="/electronics/chargers-cables" className="sub_menu_item_smaller">Chargers & Cables</NavLink>
                      <NavLink to="/electronics/mobile-laptop-stands" className="sub_menu_item_smaller">Mobile & Laptop Stands</NavLink>
                    </div>
                  </li>
                  {/*<li onClick={()=>setSideMenu(false)}>
                    <NavLink to="/track-order" className="nav_item_smaller_devices">Track Order</NavLink>
                  </li>*/}
                  <hr style={{ margin: "0px" }} />
                  <li onClick={()=>setSideMenu(false)}>
                    <NavLink to="/contact-us" className="nav_item_smaller_devices">Contact Us</NavLink>
                  </li>
                  <hr style={{ margin: "0px" }} />
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
          <SearchBar />
        </div>
        </>
      )}
    </div>
  );
}
