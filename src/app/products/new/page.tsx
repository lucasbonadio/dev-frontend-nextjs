"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api";
import { NewProductPayload } from "@/types/Product";
import Link from "next/link";
import { useToast } from "@/app/context/ToastContext";

export default function NewProductPage() {
  const showToast = useToast();
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const router = useRouter();

  function validate() {
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Título é obrigatório";
    const cleanedPrice = form.price.replace(/[^\d.]/g, "");
    const numericPrice = parseFloat(cleanedPrice);

    if (isNaN(numericPrice) || numericPrice <= 0) {
      newErrors.price = "Preço deve ser um número maior que zero";
    }

    if (!form.description.trim())
      newErrors.description = "Descrição é obrigatória";
    if (!form.category.trim()) newErrors.category = "Categoria é obrigatória";
    if (!imageFile) newErrors.image = "Selecione uma imagem";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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

    value = value.replace(/[^0-9.]/g, "");

    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts[1]?.length > 2) {
      value = parts[0] + "." + parts[1].substring(0, 2);
    }

    setForm((prev) => ({ ...prev, price: value }));
    if (errors.price) {
      setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
    }
  }

  function handlePriceBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (!value || value === ".") {
      setForm((prev) => ({ ...prev, price: "" }));
      return;
    }

    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      const formattedValue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
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

    const cleanedPrice = form.price.replace(/[^\d.]/g, "");
    const priceToSend = parseFloat(cleanedPrice);

    const productPayload: NewProductPayload = {
      title: form.title,
      price: priceToSend,
      description: form.description,
      image: form.image,
      category: form.category,
    };

    try {
      await createProduct(productPayload);

      setForm({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
      setImageFile(null);
      setImagePreview("");

      showToast("Produto criado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Failed to create product:", error);
      setApiError("Erro ao criar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow w-fit"
          aria-label="Voltar para a lista de produtos"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>
        <h1 className="text-2xl font-bold">Novo Produto</h1>
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
            placeholder="Preço (ex: 49.90)"
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
              errors.image ? "text-red-500" : ""
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
          {loading ? "Salvando..." : "Criar Produto"}
        </button>
      </form>
    </main>
  );
}
