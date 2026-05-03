"use client";

import styles from "./CartIcon.module.css";
import {useCart} from "@/context/CartContext";

export function CartIcon() {
    const { totalCount } = useCart();
    const hasItems = totalCount > 0;

    return (
        <button
            type="button"
            className={styles.button}
            aria-label={
                hasItems
                    ? `Cart, ${totalCount} ${totalCount === 1 ? "item" : "items"}`
                    : "Cart, empty"
            }
        >
            <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M3 3h2l2.4 12.5a2 2 0 0 0 2 1.5h8.6a2 2 0 0 0 2-1.6L22 8H6" />
                <circle cx="9" cy="21" r="1.5" />
                <circle cx="18" cy="21" r="1.5" />
            </svg>
            {hasItems && (
                <span className={styles.badge} aria-live="polite">
          {totalCount > 99 ? "99+" : totalCount}
        </span>
            )}
        </button>
    );
}