"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductList } from "../components/ProductList";
import { SuccessMessage } from "../components/SuccessMessage";
import { fetchProducts, deleteProduct } from "../lib/api";
import { Product } from "../types/Product";
import { useRouter } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

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
    <main className="max-w-4xl mx-auto p-4 relative">
      {toast.visible && (
        <div className="fixed bottom-4 right-4 z-50">
          <SuccessMessage initialVisibility={true} message={toast.message} />
        </div>
      )}
      
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/products/new"
            className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition font-medium shadow"
          >
            + Novo Produto
          </Link>
          <button
            onClick={handleLogout}
            className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition font-medium shadow"
            title="Sair"
            aria-label="Sair"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 border w-48 z-20">
          <nav className="flex flex-col gap-4">
            <Link
              href="/products/new"
              className="text-center px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition font-medium shadow"
              onClick={() => setIsMenuOpen(false)}
            >
              + Novo Produto
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition font-medium shadow"
            >
              Sair
            </button>
          </nav>
        </div>
      )}

      <ProductList products={products} onDelete={handleDeleteProduct} />
    </main>
  );
}