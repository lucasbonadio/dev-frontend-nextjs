// app/page.tsx
import Link from "next/link";
import { fetchProducts } from "../lib/api";
import { ProductList } from "../components/ProductList";
import { SuccessMessage } from "../components/SuccessMessage";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Lê o parâmetro 'success' e 'message' da URL
  const productActionSuccess = searchParams?.success === "true";
  const successMessage = searchParams?.message ? decodeURIComponent(searchParams.message as string) : "Produto criado com sucesso!";

  let products = [];
  try {
    products = await fetchProducts();
  } catch (e) {
    return <div className="text-red-500">Erro ao carregar produtos.</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      {productActionSuccess && (
        <div className="fixed bottom-4 right-4 z-50">
          <SuccessMessage initialVisibility={productActionSuccess} message={successMessage} />
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Link
          href="/products/new"
          className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition font-medium shadow"
        >
          + Novo Produto
        </Link>
      </div>
      <ProductList products={products} />
    </main>
  );
}