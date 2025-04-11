import styles from "./page.module.css";
import LoginForm from "./components/login";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Chateame</h1>
        <h2>Version 1.2</h2>
        <div>
          <h3>Login</h3>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
