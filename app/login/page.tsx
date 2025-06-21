
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "@/styles/SignIn.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("All fields required");
      return;
    }

    const res = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
    const users = await res.json();
    if (users.length === 1) {
      Cookies.set("user", JSON.stringify(users[0]));
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
        <input className={styles.input} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input className={styles.input} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className={styles.button} onClick={handleLogin}>Sign In</button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
