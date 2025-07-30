import { Product } from "../types/Product";
import Image from "next/image";
import Link from "next/link";

type Props = { products: Product[] };

export function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-center border rounded p-4 relative" // Added 'relative' here
        >
          {/* Edit Icon Link */}
          <Link
            href={`/products/edit/${product.id}`} // Link to the edit page for this product
            className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition z-10"
            title="Editar Produto"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </Link>

          <Image
            src={product.image}
            alt={product.title}
            width={128}
            height={128}
            className="h-32 object-contain mb-2"
            style={{ objectFit: "contain" }}
          />
          <h2 className="font-semibold text-lg text-center">{product.title}</h2>
          <p className="text-blue-600 font-bold mt-2 mb-4">
            ${product.price}
          </p>
          <Link
            href={`/products/${product.id}`}
            className="mt-auto rounded-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Ver detalhes
          </Link>
        </div>
      ))}
    </div>
  );
}