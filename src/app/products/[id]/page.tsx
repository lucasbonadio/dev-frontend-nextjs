"use client";

import { useState, useEffect } from "react";
import { fetchProductById } from "@/lib/api";
import { ProductDetail } from "@/components/ProductDetail";
import { BackButton } from "@/components/BackButton";
import { Product } from "@/types/Product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductDetailPage({ params }: any) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      const numericId = parseInt(params.id, 10);
      if (isNaN(numericId)) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const fetchedProduct = await fetchProductById(numericId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  if (loading) {
    return <div className="text-center p-8">Carregando produto...</div>;
  }

  if (error || !product) {
    return (
      <main className="max-w-2xl mx-auto p-4 flex flex-col gap-6 items-center">
        <BackButton href="/" />
        <h1 className="text-2xl font-bold">Produto Não Encontrado</h1>
        <p>
          O produto que você está procurando não existe ou não pôde ser
          carregado.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-4 flex flex-col gap-6">
      <BackButton href="/" />
      <ProductDetail product={product} />
    </main>
  );
}
