"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "@/styles/Dashboard.module.css";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = Cookies.get("user");
    if (!stored) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(stored);
    setUser(parsedUser);

    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className={styles.container}>
      <Navbar user={user} />
      <h2 className={styles.welcome}>Welcome, {user?.username}</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Quantity</th>
            {user?.role === "admin" && <th>Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nama_produk}</td>
              <td>{prod.harga_satuan}</td>
              <td>{prod.quantity}</td>
              {user?.role === "admin" && (
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.editButton}
                      onClick={() => router.push(`/edit/${prod.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(prod.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {user?.role === "admin" && (
        <button
          className={styles.addBtn}
          onClick={() => router.push("/create")}
        >
          Tambah Produk
        </button>
      )}
    </div>
  );
}
