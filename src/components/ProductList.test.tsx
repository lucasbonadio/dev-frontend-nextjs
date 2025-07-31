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

const mockOnDelete = jest.fn();

test('renderiza produtos corretamente', () => {
  render(<ProductList products={mockProducts} onDelete={mockOnDelete} />);
  expect(screen.getByText("Produto Teste")).toBeInTheDocument();
  expect(screen.getByText("$99.99")).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /produto teste/i })).toBeInTheDocument();
});