
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/Create.module.css";

export default function Create() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [qty, setQty] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama_produk: nama,
        harga_satuan: Number(harga),
        quantity: Number(qty),
      }),
    });
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h2>Tambah Produk</h2>
      <input placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
      <input placeholder="Harga" type="number" value={harga} onChange={(e) => setHarga(e.target.value)} />
      <input placeholder="Quantity" type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
      <button onClick={handleSubmit}>Simpan</button>
    </div>
  );
}
