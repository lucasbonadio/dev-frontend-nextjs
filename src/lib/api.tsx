import { LoginCredentials, LoginResponse } from "@/types/User";
import { NewProductPayload, Product } from "../types/Product";

const API_URL = "https://fakestoreapi.com"

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Produto não encontrado");
  return res.json();
}

export async function createProduct(
  productData: NewProductPayload
): Promise<Product> {
  const res = await fetch(`${API_URL}/products`, {
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
  id: number,
  productData: NewProductPayload
): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
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
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Erro ao excluir produto com ID ${id}`);
  }
  
  return res.json();
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Falha na autenticação: verifique o usuário e a senha.");
  }

  return res.json();
}