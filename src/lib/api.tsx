import { NewProductPayload, Product } from "../types/Product";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Produto não encontrado");
  return res.json();
}

export async function createProduct(productData: NewProductPayload): Promise<Product> {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar produto");
  }

  return res.json(); // A Fake Store API retorna o produto criado com um ID
}