export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export interface NewProductPayload {
  title: string;
  price: number;
  description: string;
  image: string; // Isso será a Data URL
  category: string;
}