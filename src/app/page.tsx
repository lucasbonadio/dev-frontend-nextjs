"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductList } from "../components/ProductList";
import { SuccessMessage } from "../components/SuccessMessage";
import { fetchProducts, deleteProduct } from "../lib/api";
import { Product } from "../types/Product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar produtos. Por favor, tente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      setProducts((currentProducts) =>
        currentProducts.filter((p) => p.id !== productId)
      );
      setToast({ visible: true, message: "Produto excluído com sucesso!" });
    } catch (error) {
      console.error("Falha ao excluir o produto:", error);
      setToast({ visible: true, message: "Erro ao excluir o produto." });
    }
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ visible: false, message: "" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) {
    return <div className="text-center p-8">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      {toast.visible && (
        <div className="fixed bottom-4 right-4 z-50">
          <SuccessMessage initialVisibility={true} message={toast.message} />
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Link
          href="/products/new"
          className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition font-medium shadow"
        >
          + Novo Produto
        </Link>
      </div>

      <ProductList products={products} onDelete={handleDeleteProduct} />
    </main>
  );
}
