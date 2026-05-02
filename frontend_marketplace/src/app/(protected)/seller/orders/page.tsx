"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pedido } from "@/features/orders/models";
import {
  actualizarEstadoPedido,
  getPedidosVendedor,
} from "@/features/orders/services/orderService";
import { useAuth } from "@/infrastructure/auth/AuthContext";

const statusOptions = [
  { value: "en_preparacion", label: "En preparacion" },
  { value: "enviado", label: "Enviado" },
  { value: "entregado", label: "Entregado" },
  { value: "cancelado", label: "Cancelado" },
];

function money(value: string) {
  return Number(value).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

function label(value: string) {
  return value.replaceAll("_", " ");
}

export default function SellerOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    getPedidosVendedor(token)
      .then((data) => {
        setOrders(data);
        setSelectedStatus(
          Object.fromEntries(data.map((order) => [order.id, order.estado])),
        );
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  async function updateStatus(orderId: string) {
    if (!token) return;

    setError(null);
    setSuccess(null);
    setUpdatingId(orderId);

    try {
      const updated = await actualizarEstadoPedido(
        orderId,
        selectedStatus[orderId],
        token,
      );
      setOrders((current) =>
        current.map((order) => (order.id === orderId ? updated : order)),
      );
      setSelectedStatus((current) => ({
        ...current,
        [orderId]: updated.estado,
      }));
      setSuccess("Estado actualizado.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo actualizar el estado.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Vendedor
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Pedidos recibidos
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Solo se muestran pedidos que contienen productos asociados a tu
          cuenta.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      )}

      {loading ? (
        <Card>
          <CardContent>Cargando pedidos...</CardContent>
        </Card>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent>No tienes pedidos recibidos todavia.</CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <CardTitle className="font-bold text-slate-950">
                      Pedido #{order.id.slice(0, 8)}
                    </CardTitle>
                    <p className="mt-1 text-sm text-slate-500">
                      Cliente: {order.cliente_email} ·{" "}
                      {new Date(order.created_at).toLocaleString("es-CO")}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Total
                    </p>
                    <p className="text-lg font-black text-slate-950">
                      {money(order.total)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm md:flex-row md:items-center"
                    >
                      <div>
                        <p className="font-semibold text-slate-950">
                          {item.producto_titulo_snapshot}
                        </p>
                        <p className="text-slate-500">
                          Cantidad {item.cantidad} · Talla {item.talla || "N/A"}
                        </p>
                      </div>
                      <p className="font-bold text-slate-900">
                        {money(item.subtotal)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Estado actual
                    </p>
                    <p className="font-bold capitalize text-slate-950">
                      {label(order.estado)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <select
                      value={selectedStatus[order.id] ?? order.estado}
                      onChange={(event) =>
                        setSelectedStatus((current) => ({
                          ...current,
                          [order.id]: event.target.value,
                        }))
                      }
                      className="h-9 rounded-md border border-input bg-white px-2.5 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <option value={order.estado}>
                        {label(order.estado)}
                      </option>
                      {statusOptions
                        .filter((option) => option.value !== order.estado)
                        .map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                    <Button
                      type="button"
                      onClick={() => updateStatus(order.id)}
                      disabled={
                        updatingId === order.id ||
                        selectedStatus[order.id] === order.estado
                      }
                      className="bg-emerald-600 text-white hover:bg-emerald-500"
                    >
                      {updatingId === order.id
                        ? "Actualizando..."
                        : "Actualizar"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
