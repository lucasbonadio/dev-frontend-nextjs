import { fetchProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
      <section className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            width={240}
            height={240}
            className="rounded-lg border bg-gray-50 object-contain"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold w-fit">
            {product.category}
          </span>
          <p className="text-gray-700">{product.description}</p>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-blue-600">
              ${product.price}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}