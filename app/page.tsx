import { Header } from "@/components/Header";
import { fetchData } from "@/lib/api";
import styles from "./page.module.css";

export default async function HomePage() {
  const data = await fetchData();

  return (
      <>
        <Header logo={data.logo} title={data.title} />
        <main className={styles.main}>
          <div className={styles.container}>
          </div>
        </main>
      </>
  );
}