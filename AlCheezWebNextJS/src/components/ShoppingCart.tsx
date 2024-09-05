"use client"
import Link from 'next/link'
import { Offcanvas, Stack, Button } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import CartItem from './CartItem'
import { useProductsContext } from '../context/ProductsContext';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { FC } from 'react';

// Define the type for ShoppingCart props
interface ShoppingCartProps {
    isOpen: boolean;
}

interface CartItemType {
    id: number;
    color: string;
    quantity: number;
}

// Define the shape of a product item in productsData
interface Product {
    product_id: number;
    price: number;
    sale_price?: number;
}

export const ShoppingCart: FC<ShoppingCartProps> = (props) => {
    const { closeCart, cartItems } = useShoppingCart();
    const { productsData } = useProductsContext();
    const isSmallDevice = useMediaQuery('(max-width: 768px)');

    function handleCheckout() {
        closeCart();
    }

    return (
        <Offcanvas show={props.isOpen} onHide={closeCart} placement='end' style={{ width: isSmallDevice ? "250px" : "" }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack>
                    {cartItems.map((item: CartItemType, index: number) => (
                        <CartItem key={index} {...item} />
                    ))}
                    {cartItems.length !== 0 && <div className='ms-auto fw-bold fs-5'>
                        Total: Rs. {cartItems.reduce((total, cartItem) => {
                            const product = productsData.find(item => item.product_id === cartItem.id);
                            return total + ((product?.sale_price ?? product?.price) || 0) * cartItem.quantity;
                        }, 0).toFixed(2)}
                    </div>}
                    {cartItems.length !== 0 && <Link href={"/check-out"} style={{ textDecoration: "none" }}>
                        <Button style={{ marginTop: "20px", width: "100%", height: "50px", fontSize: 20, }} variant="secondary" onClick={handleCheckout}>Check Out</Button>
                    </Link>}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
