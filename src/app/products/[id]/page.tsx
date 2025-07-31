"use client";

import { useState, useEffect } from "react";
import { fetchProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { BackButton } from "@/components/BackButton";
import { Product } from "@/types/Product"; // Importe o tipo do Produto

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
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

  if (error) {
    return notFound();
  }
  
  return (
    <main className="max-w-2xl mx-auto p-4 flex flex-col gap-6">
      <BackButton href="/" />
      {product && <ProductDetail product={product} />}
    </main>
  );
}