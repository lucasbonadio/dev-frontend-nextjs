/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchProductById, updateProduct } from "@/lib/api";
import { NewProductPayload } from "@/types/Product";
import { useToast } from "@/app/context/ToastContext";
import { BackButton } from "@/components/BackButton";

interface EditProductPageProps {
  params: {
    id: number;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const productId = params.id;
  const showToast = useToast();

  interface ProductFormState {
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
  }

  const [form, setForm] = useState<ProductFormState>({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [productNotFound, setProductNotFound] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      if (!productId) {
        setLoading(false);
        setProductNotFound(true);
        return;
      }
      try {
        setLoading(true);
        setApiError("");
        setProductNotFound(false);
        const productData = await fetchProductById(productId);

        setForm({
          title: productData.title,
          price: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(productData.price),
          description: productData.description,
          category: productData.category,
          image: productData.image,
        });
        setImagePreview(productData.image);
      } catch (error) {
        console.error("Erro ao carregar produto para edição:", error);
        setApiError(
          "Erro ao carregar produto. Verifique se o ID está correto."
        );
        setProductNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  function validate() {
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Título é obrigatório";
    const cleanedPrice = form.price.replace(/[^\d.]/g, "");
    const numericPrice = parseFloat(cleanedPrice);

    if (isNaN(numericPrice) || numericPrice <= 0)
      newErrors.price = "Preço deve ser um número maior que zero";
    if (!form.description.trim())
      newErrors.description = "Descrição é obrigatória";
    if (!form.category.trim()) newErrors.category = "Categoria é obrigatória";
    if (!imageFile && !imagePreview)
      newErrors.image = "Selecione uma imagem ou mantenha a atual";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    setErrors({ ...errors, image: "" });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
      setForm((prev) => ({ ...prev, image: "" }));
    }
  }

  function handlePriceFocus(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^\d.]/g, "");
    setForm((prev) => ({ ...prev, price: cleanedValue }));
  }

  function handlePriceInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    value = value.replace(/[^\d.]/g, "");

    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + "." + parts[1].substring(0, 2);
    }

    setForm((prev) => ({ ...prev, price: value }));
    setErrors({ ...errors, price: "" });
  }

  function handlePriceBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^\d.]/g, "");
    const numericValue = parseFloat(cleanedValue);

    if (!isNaN(numericValue)) {
      const formattedValue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numericValue);
      setForm((prev) => ({ ...prev, price: formattedValue }));
    } else {
      setForm((prev) => ({ ...prev, price: "" }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    setLoading(true);

    const priceToSend = parseFloat(form.price.replace(/[^\d.]/g, ""));

    const productPayload: NewProductPayload = {
      title: form.title,
      price: priceToSend,
      description: form.description,
      image: form.image,
      category: form.category,
    };

    try {
      await updateProduct(productId, productPayload);

      showToast("Produto atualizado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setApiError("Erro ao atualizar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-xl mx-auto p-4 flex items-center justify-center h-screen">
        <p className="text-gray-600">Carregando produto...</p>
      </main>
    );
  }

  if (productNotFound) {
    return (
      <main className="max-w-xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto Não Encontrado</h1>
        <p className="text-red-500 mb-4">
          O produto com ID "{productId}" não pôde ser carregado.
        </p>
        <BackButton href="/" text="Voltar para a lista de produtos" />
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <BackButton href="/" />
        <h1 className="text-2xl font-bold">Editar Produto</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 relative"
      >
        <div>
          <input
            name="title"
            placeholder="Título"
            className={`border px-3 py-2 rounded-xl w-full ${
              errors.title ? "border-red-500" : ""
            }`}
            value={form.title}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>
        <div>
          <input
            name="price"
            type="text"
            placeholder="Preço (ex: 12.34)"
            className={`border px-3 py-2 rounded-xl w-full ${
              errors.price ? "border-red-500" : ""
            }`}
            value={form.price}
            onChange={handlePriceInputChange}
            onBlur={handlePriceBlur}
            onFocus={handlePriceFocus}
            disabled={loading}
            inputMode="decimal"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price}</span>
          )}
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Descrição"
            className={`border px-3 py-2 rounded-xl w-full ${
              errors.description ? "border-red-500" : ""
            }`}
            value={form.description}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>
        <div>
          <input
            name="category"
            placeholder="Categoria"
            className={`border px-3 py-2 rounded-xl w-full ${
              errors.category ? "border-red-500" : ""
            }`}
            value={form.category}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.category && (
            <span className="text-red-500 text-sm">{errors.category}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="image-upload"
            className={`block text-sm font-medium text-gray-700 mb-1 ${
              errors.image ? "border-red-500" : ""
            }`}
          >
            Imagem do Produto
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            className={`block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              ${errors.image ? "border border-red-500 rounded-xl" : ""}
            `}
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image}</span>
          )}
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Pré-visualização da Imagem"
              width={128}
              height={128}
              className="mt-2 w-32 h-32 object-contain rounded border"
            />
          )}
        </div>
        {apiError && <div className="text-red-600">{apiError}</div>}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </main>
  );
}
