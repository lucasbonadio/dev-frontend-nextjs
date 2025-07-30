import { fetchProducts } from "../lib/api";
import { ProductList } from "../components/ProductList";

export default async function Home() {
  let products = [];
  try {
    products = await fetchProducts();
  } catch (e) {
    return <div className="text-red-500">Erro ao carregar produtos.</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Produtos</h1>
      <ProductList products={products} />
    </main>
  );
}