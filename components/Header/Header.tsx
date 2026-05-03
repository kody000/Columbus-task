import Image from "next/image";
import type {Image as ApiImage} from "../../types/productTypes";
import {CartIcon} from "./CartIcon";
import styles from "./Header.module.css";
import Link from "next/link";

interface HeaderProps {
    logo: ApiImage;
    title: string;
}

export function Header({logo, title}: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link href="/" aria-label={`${title} — home`}>
                    <Image
                        src={logo.url}
                        alt={logo.altText}
                        width={140}
                        height={40}
                        priority
                        className={styles.logo}
                    />
                </Link>
                <span className={styles.title}>{title}</span>
                <CartIcon/>
            </div>
        </header>
    );
}