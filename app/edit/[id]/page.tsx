
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "@/styles/Edit.module.css";

export default function Edit() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [qty, setQty] = useState("");
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setNama(data.nama_produk);
        setHarga(data.harga_satuan);
        setQty(data.quantity);
      });
  }, [params.id]);

  const handleUpdate = async () => {
    await fetch(`http://localhost:3001/products/${params.id}`, {
      method: "PUT",
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
      <h2>Edit Produk</h2>
      <input value={nama} onChange={(e) => setNama(e.target.value)} />
      <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} />
      <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
