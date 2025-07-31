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

export async function createProduct(
  productData: NewProductPayload
): Promise<Product> {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar produto");
  }

  return res.json();
}

export async function updateProduct(
  id: string,
  productData: NewProductPayload
): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    throw new Error(`Erro ao atualizar produto com ID ${id}`);
  }

  return res.json();
}

export async function deleteProduct(id: number): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Erro ao excluir produto com ID ${id}`);
  }
  
  return res.json();
}
