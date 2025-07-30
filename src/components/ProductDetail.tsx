import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export function ProductDetail({ product }: { product: Product }) {
  return (
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
  );
}