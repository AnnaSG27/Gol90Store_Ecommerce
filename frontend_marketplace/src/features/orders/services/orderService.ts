import type { CheckoutPayload, Pedido } from "../models";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(res: Response): Promise<T> {
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    if (res.ok) return {} as T;
    throw new Error(`Error del servidor (${res.status})`);
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null
        ? Object.values(data).flat().join(" ")
        : "Error desconocido";
    throw new Error(message);
  }

  return data as T;
}

function authHeaders(token: string) {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function checkout(
  payload: CheckoutPayload,
  token: string,
): Promise<Pedido> {
  const res = await fetch(`${API_URL}/api/pedidos/checkout/`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse<Pedido>(res);
}

export async function getMisPedidos(token: string): Promise<Pedido[]> {
  const res = await fetch(`${API_URL}/api/pedidos/mis-pedidos/`, {
    headers: authHeaders(token),
  });
  return handleResponse<Pedido[]>(res);
}

export async function getPedidosVendedor(token: string): Promise<Pedido[]> {
  const res = await fetch(`${API_URL}/api/pedidos/vendedor/`, {
    headers: authHeaders(token),
  });
  return handleResponse<Pedido[]>(res);
}

export async function actualizarEstadoPedido(
  pedidoId: string,
  estado: string,
  token: string,
): Promise<Pedido> {
  const res = await fetch(`${API_URL}/api/pedidos/${pedidoId}/estado/`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ estado }),
  });
  return handleResponse<Pedido>(res);
}
