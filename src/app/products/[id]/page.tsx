import { fetchProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { BackButton } from "@/components/BackButton";

type Props = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  let product;
  try {
    product = await fetchProductById(Number(params.id));
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
