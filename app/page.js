import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Chateame</h1>
        <h2>Version 1.2</h2>
        <div className={styles.ctas}>
        </div>
      </main>
    </div>
  );
}
