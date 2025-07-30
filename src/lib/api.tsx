import { Product } from "../types/Product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}