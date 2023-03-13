import Link from "next/link";
import styles from "./NavBar.module.css";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    <nav className={router.pathname === "/" ? styles.nav : styles.active}>
      <Link href="/">
        <button className={`${styles.nav} ${styles.active}`}>Home</button>
      </Link>
      <Link href="/about">
        <button className={[styles.nav, styles.active].join(" ")}>About</button>
      </Link>
    </nav>
  );
}
