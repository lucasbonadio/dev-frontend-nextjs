import { fetchProducts, fetchProductById, updateProduct, deleteProduct } from "./api";
import { NewProductPayload } from "@/types/Product";

describe("API FakeStore", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("deve retornar lista de produtos em fetchProducts", async () => {
    const mockProducts = [
      { id: 1, title: "Produto 1" },
      { id: 2, title: "Produto 2" },
    ];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products");
  });

  it("deve retornar um produto em fetchProductById", async () => {
    const mockProduct = { id: 1, title: "Produto Teste" };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockProduct,
    });

    const product = await fetchProductById("1");
    expect(product).toEqual(mockProduct);
    expect(global.fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products/1");
  });

  it("deve lançar erro se fetchProducts falhar", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    await expect(fetchProducts()).rejects.toThrow();
  });

  it("deve lançar erro se fetchProductById falhar", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    await expect(fetchProductById("1")).rejects.toThrow();
  });

  it("deve atualizar um produto em updateProduct", async () => {
    const productId = 1;
    const productData: NewProductPayload = {
      title: "Produto Atualizado",
      price: 150.99,
      description: "Nova descrição",
      category: "nova",
      image: "url"
    };
    const mockUpdatedProduct = { id: productId, ...productData };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUpdatedProduct,
    });

    const result = await updateProduct(productId, productData);

    expect(result).toEqual(mockUpdatedProduct);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://fakestoreapi.com/products/${productId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      }
    );
  });

  it("deve lançar erro se updateProduct falhar", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    await expect(updateProduct(1, {} as NewProductPayload)).rejects.toThrow();
  });

  it("deve deletar um produto em deleteProduct", async () => {
    const productId = 1;
    const mockDeletedProduct = { id: productId, title: "Produto Deletado" };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDeletedProduct,
    });

    const result = await deleteProduct(productId);

    expect(result).toEqual(mockDeletedProduct);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://fakestoreapi.com/products/${productId}`,
      {
        method: "DELETE",
      }
    );
  });

  it("deve lançar erro se deleteProduct falhar", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    await expect(deleteProduct(1)).rejects.toThrow();
  });
});