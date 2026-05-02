"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ProductForm } from "@/features/seller/ProductForm";
import { actualizarProductoVendedor } from "@/features/seller/services/sellerProductService";
import type { PublicacionDetail } from "@/features/services/models";
import { getPublicacion } from "@/features/services/services/publicacionService";
import { useAuth } from "@/infrastructure/auth/AuthContext";

export default function EditSellerProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { token } = useAuth();
  const [product, setProduct] = useState<PublicacionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublicacion(params.id)
      .then(setProduct)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Editar producto
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Actualizar publicacion
        </h1>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <Card className="border-slate-200 bg-white">
        <CardContent>
          {isLoading ? (
            <p>Cargando producto...</p>
          ) : product ? (
            <ProductForm
              initialProduct={product}
              submitLabel="Guardar cambios"
              isSubmitting={isSubmitting}
              onSubmit={async (payload) => {
                if (!token) return;
                setError(null);
                setIsSubmitting(true);
                try {
                  await actualizarProductoVendedor(product.id, payload, token);
                  router.push("/seller/products");
                } catch (err) {
                  setError(
                    err instanceof Error
                      ? err.message
                      : "No se pudo actualizar el producto.",
                  );
                } finally {
                  setIsSubmitting(false);
                }
              }}
            />
          ) : (
            <p>No se encontro el producto.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
