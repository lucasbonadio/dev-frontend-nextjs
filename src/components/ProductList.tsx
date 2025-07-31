"use client";
import { useState } from "react";
import { Product } from "../types/Product";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
  onDelete: (productId: number) => void;
};

export function ProductList({ products, onDelete }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setProductToDelete(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.id);
      handleCloseModal();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center border rounded-lg p-4 relative bg-white shadow-sm transition hover:shadow-md"
          >
            <button
              onClick={() => handleOpenModal(product)}
              className="absolute top-2 left-2 p-1.5 rounded-full cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition z-10"
              title="Deletar Produto"
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
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>

            <Link
              href={`/products/edit/${product.id}`}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition z-10"
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
              className="h-32 object-contain mb-4"
              style={{ objectFit: "contain" }}
            />
            <h2 className="font-semibold text-lg text-center mb-2 h-14 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-blue-600 font-bold text-xl mt-auto mb-4">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
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

      {isModalOpen && productToDelete && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto z-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirmar Exclusão
            </h2>
            <p className="text-gray-600 mb-6">
              Você tem certeza que deseja excluir o produto "
              <span className="font-semibold">{productToDelete.title}</span>"?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
