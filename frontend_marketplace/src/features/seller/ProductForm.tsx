"use client";

import { type FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  CreatePublicacionPayload,
  PublicacionDetail,
} from "@/features/services/models";

const categories = [
  { value: "liga_espanola", label: "Liga espanola" },
  { value: "liga_inglesa", label: "Liga inglesa" },
  { value: "liga_italiana", label: "Liga italiana" },
  { value: "liga_alemana", label: "Liga alemana" },
  { value: "liga_francesa", label: "Liga francesa" },
  { value: "liga_colombiana", label: "Liga colombiana" },
  { value: "selecciones", label: "Selecciones" },
  { value: "retro", label: "Retro" },
  { value: "otro", label: "Otro" },
];

const statuses = [
  { value: "borrador", label: "Borrador" },
  { value: "publicado", label: "Publicado" },
  { value: "agotado", label: "Agotado" },
];

interface ProductFormProps {
  initialProduct?: PublicacionDetail;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (payload: CreatePublicacionPayload) => Promise<void>;
}

export function ProductForm({
  initialProduct,
  submitLabel,
  isSubmitting,
  onSubmit,
}: ProductFormProps) {
  const initialTallas = useMemo(
    () => initialProduct?.tallas_disponibles?.join(", ") ?? "S, M, L",
    [initialProduct],
  );

  const [titulo, setTitulo] = useState(initialProduct?.titulo ?? "");
  const [equipo, setEquipo] = useState(initialProduct?.equipo ?? "");
  const [temporada, setTemporada] = useState(initialProduct?.temporada ?? "");
  const [descripcion, setDescripcion] = useState(
    initialProduct?.descripcion ?? "",
  );
  const [categoria, setCategoria] = useState(
    initialProduct?.categoria ?? "liga_colombiana",
  );
  const [precio, setPrecio] = useState(initialProduct?.precio ?? "");
  const [stock, setStock] = useState(String(initialProduct?.stock ?? 0));
  const [estado, setEstado] = useState(initialProduct?.estado ?? "borrador");
  const [tallas, setTallas] = useState(initialTallas);
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const parsedPrecio = Number(precio);
    const parsedStock = Number(stock);
    const parsedTallas = tallas
      .split(",")
      .map((talla) => talla.trim())
      .filter(Boolean);

    if (!titulo.trim() || !equipo.trim() || !descripcion.trim()) {
      setError("Completa titulo, equipo y descripcion.");
      return;
    }

    if (!Number.isFinite(parsedPrecio) || parsedPrecio <= 0) {
      setError("El precio debe ser mayor a cero.");
      return;
    }

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      setError("El stock debe ser un numero entero mayor o igual a cero.");
      return;
    }

    if (parsedTallas.length === 0) {
      setError("Agrega al menos una talla.");
      return;
    }

    await onSubmit({
      titulo: titulo.trim(),
      equipo: equipo.trim(),
      temporada: temporada.trim(),
      descripcion: descripcion.trim(),
      categoria,
      precio: parsedPrecio,
      stock: parsedStock,
      estado,
      tallas_disponibles: parsedTallas,
      imagenes: imagenes.length > 0 ? imagenes : undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label
          htmlFor="product-title"
          className="space-y-2 text-sm font-semibold text-slate-700"
        >
          Titulo
          <Input
            id="product-title"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        </label>
        <label
          htmlFor="product-team"
          className="space-y-2 text-sm font-semibold text-slate-700"
        >
          Equipo
          <Input
            id="product-team"
            value={equipo}
            onChange={(event) => setEquipo(event.target.value)}
          />
        </label>
        <label
          htmlFor="product-season"
          className="space-y-2 text-sm font-semibold text-slate-700"
        >
          Temporada
          <Input
            id="product-season"
            value={temporada}
            placeholder="2025/26"
            onChange={(event) => setTemporada(event.target.value)}
          />
        </label>
        <label
          htmlFor="product-category"
          className="space-y-2 text-sm font-semibold text-slate-700"
        >
          Categoria
          <select
            id="product-category"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="product-price"
          className="space-y-2 text-sm font-semibold text-slate-700"
        >
          Precio
          <Input
            id="product-price"
            type="number"
            min="0"
            step="1000"
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
          />
        </label>
        <label
          htmlFor="product-stock"
          className="space-y-2 text-sm font-semibold text-slate-700"
        >
          Stock
          <Input
            id="product-stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
          />
        </label>
        <label
          htmlFor="product-status"
          className="space-y-2 text-sm font-semibold text-slate-700"
        >
          Estado
          <select
            id="product-status"
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
            className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {statuses.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="product-sizes"
          className="space-y-2 text-sm font-semibold text-slate-700"
        >
          Tallas
          <Input
            id="product-sizes"
            value={tallas}
            placeholder="S, M, L, XL"
            onChange={(event) => setTallas(event.target.value)}
          />
        </label>
      </div>

      <label
        htmlFor="product-description"
        className="block space-y-2 text-sm font-semibold text-slate-700"
      >
        Descripcion
        <Textarea
          id="product-description"
          value={descripcion}
          rows={5}
          onChange={(event) => setDescripcion(event.target.value)}
        />
      </label>

      <label
        htmlFor="product-images"
        className="block space-y-2 text-sm font-semibold text-slate-700"
      >
        Imagenes
        <Input
          id="product-images"
          type="file"
          multiple
          accept="image/*"
          onChange={(event) =>
            setImagenes(Array.from(event.target.files ?? []))
          }
        />
        {initialProduct && (
          <span className="block text-xs font-normal text-slate-500">
            Si no seleccionas nuevas imagenes, se conservan las actuales.
          </span>
        )}
      </label>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-emerald-600 text-white hover:bg-emerald-500"
      >
        {isSubmitting ? "Guardando..." : submitLabel}
      </Button>
    </form>
  );
}
