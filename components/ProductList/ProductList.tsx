import styles from "./ProductList.module.css";
import {Product} from "@/types/productTypes";
import {ProductCard} from "./ProductCard";

interface ProductListProps {
    products: Product[];
}

export function ProductList({products}: ProductListProps) {
    if (products.length === 0) {
        return (
            <div className={styles.empty} role="status">
                <p>No products available right now.</p>
            </div>
        );
    }

    return (
        <ul className={styles.grid} role="list">
            {products.map((product) => (
                <li key={product.articleNumber} className={styles.item}>
                    <ProductCard product={product} />
                </li>
            ))}
        </ul>
    );
}