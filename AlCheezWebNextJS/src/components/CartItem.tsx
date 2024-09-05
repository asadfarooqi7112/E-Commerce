import { useShoppingCart } from '../context/ShoppingCartContext';
import { Button, Stack } from 'react-bootstrap';
import { useProductsContext } from '../context/ProductsContext';
import styles from "./CartItem.module.css";

import Image from 'next/image';

// Define types for the product and the CartItem props
interface CartItemProps {
  id: number;
  color: string;
  quantity: number;
}

export default function CartItem({ id, color, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const { productsData } = useProductsContext();

  // Find the product from the context
  const item = productsData.find(item => item.product_id === id);
  if (item == null) return null;

  return (
    <Stack direction='horizontal' gap={2} className={styles.cartItem_container}>
      <div className={styles.image_name_price_container}>
        <Image 
          src={item.productimages[0].image_url} 
          width={100} 
          height={100} 
          style={{ width: "100px", height: "75px", objectFit: "cover" }} 
          alt='Product'
        />
        <div className={styles.name_price_container}>
          <div className={styles.item_name_container}>
            {item.name}
          </div>
          <div 
            className={styles.text_muted} 
            style={{ fontSize: "0.75rem", display: "flex", justifyContent: 'space-between', marginRight: '15px' }}
          >
            <p>
              Rs. {item.sale_price ? item.sale_price : item.price} 
              {quantity > 1 && <span className={styles.text_muted} style={{ fontSize: "0.65rem" }}> x{quantity}</span>}
            </p>
            <p>Color: {color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}</p>
          </div>
        </div>
      </div>
      <div className={styles.total_price_cancel_container}>
        <div>
          Rs. {((item.sale_price ? item.sale_price : item.price) * quantity).toFixed(2)}
        </div>
        <Button 
          variant='outline-danger' 
          size='sm' 
          onClick={() => removeFromCart(item.product_id, color)}
        >
          &times;
        </Button>
      </div>
    </Stack>
  );
}
