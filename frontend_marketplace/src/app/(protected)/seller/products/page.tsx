"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMisProductos } from "@/features/seller/services/sellerProductService";
import type { PublicacionListItem } from "@/features/services/models";
import { useAuth } from "@/infrastructure/auth/AuthContext";

function money(value: string) {
  return Number(value).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function SellerProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<PublicacionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    getMisProductos(token)
      .then((data) => setProducts(data.results))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Vendedor
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Mis productos
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Administra publicaciones, precio, stock y estado.
          </p>
        </div>
        <Button
          asChild
          className="bg-emerald-600 text-white hover:bg-emerald-500"
        >
          <Link href="/seller/products/new">Crear producto</Link>
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <Card>
          <CardContent>Cargando productos...</CardContent>
        </Card>
      ) : products.length === 0 ? (
        <Card>
          <CardContent className="space-y-4">
            <p>No tienes productos publicados todavia.</p>
            <Button
              asChild
              className="bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <Link href="/seller/products/new">Crear primer producto</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-12 border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            <span className="col-span-5">Producto</span>
            <span className="col-span-2">Precio</span>
            <span className="col-span-2">Stock</span>
            <span className="col-span-2">Estado</span>
            <span className="col-span-1 text-right">Accion</span>
          </div>
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-12 items-center gap-3 border-b border-slate-100 px-4 py-4 text-sm last:border-b-0"
            >
              <div className="col-span-12 flex items-center gap-3 md:col-span-5">
                <div className="size-14 overflow-hidden rounded-xl bg-slate-100">
                  {product.imagen_principal_url ? (
                    <img
                      src={product.imagen_principal_url}
                      alt={product.titulo}
                      className="size-full object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="font-bold text-slate-950">{product.titulo}</p>
                  <p className="text-slate-500">
                    {product.equipo} · {product.temporada}
                  </p>
                </div>
              </div>
              <div className="col-span-4 font-semibold text-slate-900 md:col-span-2">
                {money(product.precio)}
              </div>
              <div className="col-span-3 text-slate-700 md:col-span-2">
                {product.stock}
              </div>
              <div className="col-span-3 capitalize text-slate-700 md:col-span-2">
                {product.estado}
              </div>
              <div className="col-span-2 text-right md:col-span-1">
                <Link
                  href={`/seller/products/${product.id}/edit`}
                  className="text-sm font-bold text-emerald-700 hover:text-emerald-600"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
