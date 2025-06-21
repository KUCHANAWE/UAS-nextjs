
"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "@/styles/Navbar.module.css";

export default function Navbar({ user }) {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("user");
    router.push("/login");
  };

  return (
    <div className={styles.navbar}>
      <span>{user?.username} ({user?.role})</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
