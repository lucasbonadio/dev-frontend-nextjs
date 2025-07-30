import { fetchProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProductDetail } from "@/components/ProductDetail";

type Props = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  let product;
  try {
    product = await fetchProductById(params.id);
  } catch {
    return notFound();
  }

  if (!product) return notFound();

  return (
    <main className="max-w-2xl mx-auto p-4 flex flex-col gap-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow w-fit"
        aria-label="Voltar para a lista de produtos"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Voltar
      </Link>
      <ProductDetail product={product} />
    </main>
  );
}