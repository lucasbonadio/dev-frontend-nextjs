import { fetchProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { BackButton } from "@/components/BackButton";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const numericId = parseInt(params.id, 10);

  if (isNaN(numericId)) {
    return notFound();
  }

  let product;
  try {
    product = await fetchProductById(numericId);
  } catch {
    return notFound();
  }

  if (!product) return notFound();

  return (
    <main className="max-w-2xl mx-auto p-4 flex flex-col gap-6">
      <BackButton href="/" />
      <ProductDetail product={product} />
    </main>
  );
}