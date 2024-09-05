import Link from "next/link";
import styles from "./ProductCard.module.css";
import ImageSlider from "./ImageSlider";

interface ProductImage {
  image_url: string;
}

interface ProductData {
    product_id: number;
    name: string;
    description: string;
    price: number;
    sale_price: number;
    stock: number;
    category_id: number;
    productimages: ProductImage[];
  }
interface ProductCardProps {
  data: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { data } = props;
  const productLink = `/electronics/${data.category_id}/${data.product_id}-${data.name.toLowerCase().replace(/[\s\\"/]+/g, '-')}`;

  return (
    <div className={styles.productCard_container}>
      <div className={styles.cardImage_container}>
        <ImageSlider 
          slides={data.productimages} 
          name={data.name} 
          product_id={data.product_id} 
          category_id={data.category_id} 
        />
      </div>
      {data.sale_price ? 
        <div>
          <Link href={productLink} className={styles.link}>
            <p className={styles.product_name}>{data.name}</p>
            <p className={styles.sale_price}>Rs. {data.sale_price}</p>
            <p className={styles.ProductOriginal_price}>
              <span className={styles.line_through}>Rs. {data.price}</span> -{Math.round((data.price - data.sale_price) * 100 / data.price)}%
            </p>
          </Link>
        </div>
        :
        <div>
          <Link href={productLink} className={styles.link}>
            <p className={styles.product_name}>{data.name}</p>
            <p className={styles.price}>Rs. {data.price}</p>
          </Link>
        </div>
      }
    </div>
  );
};

export default ProductCard;
