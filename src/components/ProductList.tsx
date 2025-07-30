import { Product } from "../types/Product";
import Image from "next/image";

type Props = { products: Product[] };

export function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col items-center border rounded p-4">
          <Image
            src={product.image}
            alt={product.title}
            width={128}
            height={128}
            className="h-32 object-contain mb-2"
            style={{ objectFit: "contain" }}
          />
          <h2 className="font-semibold text-lg text-center">{product.price}</h2>
          <p className="text-blue-600 font-bold mt-2 mb-4">${product.price}</p>
          <a
            href={`/products/${product.id}`}
            className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Ver detalhes
          </a>
        </div>
      ))}
    </div>
  );
}