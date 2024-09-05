"use client";

import { useState, useEffect } from "react";

import { useShoppingCart } from '../context/ShoppingCartContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Offcanvas } from 'react-bootstrap';

import Link from "next/link"
import Image from 'next/image';
import styles from "./Navbar.module.css"

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BsCart } from 'react-icons/bs';
import HamburgerButton from "./HamburgerButton";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const [sideMenu, setSideMenu] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen ] = useState(false);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  function handleSubMenu(){
    console.log(isSubMenuOpen)
    setIsSubMenuOpen(prev=>!prev)
  }

  return (
    <div>
    {!isSmallDevice ? 
      <nav className={styles.navbar_container}>
        <Link href="/" className={styles.navbar_title}><Image src="/AlCheez-Logo.png" width={50} height={50} alt='my-logo'/>ALCHEEZ</Link>
        <SearchBar />
        <ul className={styles.nav_list}>
            <li>
              <Link href="/" className={styles.nav_item}>Home</Link>
            </li>
            <li>
              <Link
                href="/electronics"
                className={styles.nav_item}
                onMouseOver={() => setIsSubMenuOpen(true)}
                onMouseLeave={() => setIsSubMenuOpen(false)}
                onClick={() => setIsSubMenuOpen(false)}
              >
                Electronics <FiChevronDown />
              </Link>
              {isSubMenuOpen && (
                <div
                    className={styles.electronics_sub_menu}
                    onMouseOver={() => setIsSubMenuOpen(true)}
                    onMouseLeave={() => setIsSubMenuOpen(false)}
                    onClick={() => setIsSubMenuOpen(false)}
                >
                  <Link href="/electronics/headsets" className={styles.sub_menu_item}>Headsets</Link>
                  <Link href="/electronics/speakers" className={styles.sub_menu_item}>Speakers</Link>
                  <Link href="/electronics/power-banks" className={styles.sub_menu_item}>Power Banks</Link>
                  <Link href="/electronics/smart-watches" className={styles.sub_menu_item}>Smart Watches</Link>
                  <Link href="/electronics/chargers-cables" className={styles.sub_menu_item}>Chargers & Cables</Link>
                  <Link href="/electronics/mobile-laptop-stands" className={styles.sub_menu_item}>Mobile & Laptop Stands</Link>
                </div>
              )}
            </li>
                {/*  <li>
              <NavLink to="/track-order" className="nav_item">Track Order</NavLink>
            </li>*/}
            <li>
              <Link
                href="/contact-us"
                className={styles.nav_item}
              >
                Contact Us
              </Link>
            </li>
        </ul>
        <button className={styles.cart_button} onClick={openCart} >
            <BsCart color='black' size={30}/>
            {isClient && (cartQuantity !== 0 && <span className={styles.cart_item_counter}>{cartQuantity}</span>)}
        </button>
    </nav>
    :
    <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#F5F5F5", paddingBottom: "10px" }}>
      <div className={styles.navbar_container_smaller_devices}>
        <div onClick={() => setSideMenu(true)}>
          <HamburgerButton />
        </div>
        <Link href="/" className={styles.navbar_title_smaller_devices}><Image src="/AlCheez-Logo.png" width={40} height={40} style={{width: "40px",height:"40px"}} alt='site-logo'/>ALCHEEZ</Link>
        <button className={styles.cart_button_smaller_devices} onClick={openCart}>
          <BsCart color='black' size={20}/>
          {isClient && (cartQuantity !== 0 && <div className={styles.cart_item_counter_smaller_devices}>{cartQuantity}</div>)}
        </button>
        <Offcanvas show={sideMenu} onHide={() => setSideMenu(false)} style={{ width: "250px" }}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className={styles.nav_list_smaller_devices}>
              <li onClick={()=>setSideMenu(false)}>
                <Link href="/" className={styles.nav_item_smaller_devices}>Home</Link>
              </li>
              <hr style={{ margin: "0px" }} />
              <li>
              <div style={{display:"flex", justifyContent: "space-between", alignItems: "center"}}>
                <Link
                  href="/electronics"
                  className={styles.nav_item_smaller_devices}
                  onClick={()=>setSideMenu(false)}
                >
                  Electronics
                </Link>
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
                  {isSubMenuOpen ? <FiChevronUp onClick={handleSubMenu}/> : <FiChevronDown onClick={handleSubMenu}/>}
                  </div>
                  <div className={`${styles.electronics_sub_menu_smaller} ${isSubMenuOpen ? styles.show : ''}`} onClick={()=>setSideMenu(false)}>
                    <Link href="/electronics/headsets" className={styles.sub_menu_item_smaller} style={{marginTop: "10px"}}>Headsets</Link>
                    <Link href="/electronics/speakers" className={styles.sub_menu_item_smaller}>Speakers</Link>
                    <Link href="/electronics/power-banks" className={styles.sub_menu_item_smaller}>Power Banks</Link>
                    <Link href="/electronics/smart-watches" className={styles.sub_menu_item_smaller}>Smart Watches</Link>
                    <Link href="/electronics/chargers-cables" className={styles.sub_menu_item_smaller}>Chargers & Cables</Link>
                    <Link href="/electronics/mobile-laptop-stands" className={styles.sub_menu_item_smaller}>Mobile & Laptop Stands</Link>
                  </div>
              </li>
              {/*<li onClick={()=>setSideMenu(false)}>
                <Link to="/track-order" className="nav_item_smaller_devices">Track Order</Link>
              </li>*/}
              <hr style={{ margin: "0px" }} />
              <li onClick={()=>setSideMenu(false)}>
                <Link href="/contact-us" className={styles.nav_item_smaller_devices}>Contact Us</Link>
              </li>
              <hr style={{ margin: "0px" }} />
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      </div>
      }
  </div>
  )
}
