import styles from "./page.module.css";
import LoginForm from "./components/login";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
