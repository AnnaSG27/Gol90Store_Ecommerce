"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Pedido } from "@/features/orders/models";
import { getMisPedidos } from "@/features/orders/services/orderService";
import { useAuth } from "@/infrastructure/auth/AuthContext";

function money(value: string) {
  return Number(value).toLocaleString("es-CO");
}

function date(value: string) {
  return new Date(value).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MisPedidosPage() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getMisPedidos(token)
      .then(setPedidos)
      .catch((err) =>
        setError(
          err instanceof Error
            ? err.message
            : "No se pudieron cargar los pedidos",
        ),
      )
      .finally(() => setIsLoading(false));
  }, [token]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
          Compras
        </p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          Mis pedidos
        </h1>
      </div>

      {isLoading && (
        <p className="text-sm text-slate-500">Cargando pedidos...</p>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && pedidos.length === 0 && (
        <Card>
          <CardContent className="space-y-4 p-8 text-center">
            <p className="text-sm text-slate-600">Todavia no tienes pedidos.</p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-500">
              <Link href="/productos">Explorar catalogo</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <Card key={pedido.id} className="border-slate-200 bg-white">
            <CardContent className="space-y-4 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                    Pedido {pedido.id.slice(0, 8)}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {date(pedido.created_at)}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-semibold capitalize text-slate-950">
                    {pedido.estado.replaceAll("_", " ")}
                  </p>
                  <p className="text-lg font-black text-slate-950">
                    ${money(pedido.total)}
                  </p>
                  {pedido.pago && (
                    <p className="text-xs text-slate-500">
                      Pago {pedido.pago.estado}
                    </p>
                  )}
                </div>
              </div>

              <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
                {pedido.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-slate-950">
                        {item.producto_titulo_snapshot}
                      </p>
                      <p className="text-slate-500">
                        {item.cantidad} unidad(es)
                        {item.talla ? ` · Talla ${item.talla}` : ""}
                      </p>
                    </div>
                    <p className="font-bold text-slate-950">
                      ${money(item.subtotal)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
