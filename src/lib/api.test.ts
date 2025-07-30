import { fetchProducts, fetchProductById } from "./api";

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
});