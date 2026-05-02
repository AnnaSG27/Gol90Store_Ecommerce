import type {
  CreatePublicacionPayload,
  PaginatedResponse,
  PublicacionDetail,
  PublicacionListItem,
} from "@/features/services/models";
import { createPublicacion } from "@/features/services/services/publicacionService";

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

function buildProductFormData(payload: CreatePublicacionPayload) {
  const formData = new FormData();
  formData.append("titulo", payload.titulo);
  formData.append("equipo", payload.equipo);
  formData.append("temporada", payload.temporada);
  formData.append("descripcion", payload.descripcion);
  formData.append("categoria", payload.categoria);
  formData.append("precio", String(payload.precio));
  formData.append("stock", String(payload.stock));
  if (payload.estado) formData.append("estado", payload.estado);

  for (const talla of payload.tallas_disponibles) {
    formData.append("tallas_disponibles", talla);
  }

  if (payload.imagenes) {
    for (const file of payload.imagenes) {
      formData.append("imagenes", file);
    }
  }

  return formData;
}

export async function getMisProductos(
  token: string,
): Promise<PaginatedResponse<PublicacionListItem>> {
  const res = await fetch(`${API_URL}/api/productos/?mine=1&page_size=100`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse<PaginatedResponse<PublicacionListItem>>(res);
}

export async function crearProductoVendedor(
  payload: CreatePublicacionPayload,
  token: string,
): Promise<PublicacionDetail> {
  return createPublicacion(payload, token);
}

export async function actualizarProductoVendedor(
  id: string,
  payload: CreatePublicacionPayload,
  token: string,
): Promise<PublicacionDetail> {
  const res = await fetch(`${API_URL}/api/productos/${id}/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: buildProductFormData(payload),
  });
  return handleResponse<PublicacionDetail>(res);
}
