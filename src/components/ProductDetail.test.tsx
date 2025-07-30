import { render, screen } from "@testing-library/react";
import { ProductDetail } from "./ProductDetail";

const mockProduct = {
  id: 1,
  title: "Produto Teste",
  price: 99.99,
  description: "Descrição do produto",
  category: "Categoria",
  image: "https://fakestoreapi.com/img/teste.jpg",
};

test("renderiza detalhes do produto corretamente", () => {
  render(<ProductDetail product={mockProduct} />);
  expect(screen.getByText("Produto Teste")).toBeInTheDocument();
  expect(screen.getByText("Descrição do produto")).toBeInTheDocument();
  expect(screen.getByText("$99.99")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /produto teste/i })).toBeInTheDocument();
});