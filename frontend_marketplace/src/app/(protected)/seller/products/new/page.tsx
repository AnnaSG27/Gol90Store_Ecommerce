"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ProductForm } from "@/features/seller/ProductForm";
import { crearProductoVendedor } from "@/features/seller/services/sellerProductService";
import { useAuth } from "@/infrastructure/auth/AuthContext";

export default function NewSellerProductPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Nuevo producto
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Crear publicacion
        </h1>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <Card className="border-slate-200 bg-white">
        <CardContent>
          <ProductForm
            submitLabel="Crear producto"
            isSubmitting={isSubmitting}
            onSubmit={async (payload) => {
              if (!token) return;
              setError(null);
              setIsSubmitting(true);
              try {
                await crearProductoVendedor(payload, token);
                router.push("/seller/products");
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err.message
                    : "No se pudo crear el producto.",
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
