"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import styles from "./ProductCard.module.css";
import {Product} from "@/types/productTypes";
import getPricing from "@/utils/getPricing";
import {useCart} from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({product}: ProductCardProps) {
    const { addItem } = useCart();
    const [isSending, setIsSending] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    const pricing = getPricing(product);

    useEffect(() => {
        if (!isSending) return;

        const id = setTimeout(() => {
            addItem(product);
            setIsSending(false);
            setJustAdded(true);
        }, 600);

        return () => clearTimeout(id);
    }, [addItem, isSending, product]);

    useEffect(() => {
        if (!justAdded) return;
        const id = setTimeout(() => setJustAdded(false), 1500);
        return () => clearTimeout(id);
    }, [justAdded]);

    function handleAdd() {
        if (isSending) return;
        setIsSending(true);
    }

    return (
        <article className={styles.card}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={product.image.url}
                        alt={product.image.altText}
                        fill
                        className={styles.image}
                    />
                    {pricing.hasDiscount && product.promotion && (
                        <span className={styles.badge}>
              <span className={styles.badgePercent}>
                −{pricing.discountPercentage}%
              </span>
              <span className={styles.badgeName}>{product.promotion.name}</span>
            </span>
                    )}
                </div>

            <div className={styles.body}>
                <div className={styles.brand}>
                    <Image
                        src={product.brandLogo}
                        alt=""
                        width={20}
                        height={20}
                        className={styles.brandLogo}
                    />
                    <span className={styles.brandName}>{product.brandName}</span>
                </div>

                <h2 className={styles.title}>
                    <a href={product.link} className={styles.titleLink}>
                        {product.title}
                    </a>
                </h2>

                <p className={styles.description}>{product.description}</p>

                <div className={styles.priceRow}>
                    {pricing.hasDiscount ? (
                        <>
              <span className={styles.priceFinal}>
                {`$${pricing.final}`}
              </span>
                            <del className={styles.priceOriginal}>
                                {`$${pricing.original}`}
                            </del>
                        </>
                    ) : (
                        <span className={styles.priceFinal}>
                                {`$${pricing.original}`}
            </span>
                    )}
                </div>

                <button
                    type="button"
                    className={styles.addButton}
                    onClick={handleAdd}
                    disabled={isSending}
                    aria-busy={isSending}
                >
                    {isSending ? (
                        <>
                            <span>Adding…</span>
                        </>
                    ) : justAdded ? (
                        <span>Added</span>
                    ) : (
                    <span>Add to cart</span>
                    )}
                </button>
            </div>
        </article>
    );
}