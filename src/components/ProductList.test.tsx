import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductList } from './ProductList';

const mockProducts = [
  {
    id: 1,
    title: "Produto Teste",
    price: 99.99,
    description: "Descrição",
    category: "Categoria",
    image: "https://fakestoreapi.com/img/teste.jpg",
  },
];

test('renderiza produtos corretamente', () => {
  render(<ProductList products={mockProducts} />);
  expect(screen.getByText("Produto Teste")).toBeInTheDocument();
  expect(screen.getByText("$99.99")).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /produto teste/i })).toBeInTheDocument();
});