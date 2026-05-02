export interface PedidoItem {
  id: string;
  producto_id: string;
  producto_titulo_snapshot: string;
  vendedor_email: string;
  cantidad: number;
  talla: string;
  precio_unitario_snapshot: string;
  subtotal: string;
}

export interface Pago {
  id: string;
  proveedor: string;
  estado: string;
  referencia: string;
  monto: string;
  created_at: string;
}

export interface Pedido {
  id: string;
  cliente_email: string;
  estado: string;
  subtotal: string;
  total: string;
  direccion_entrega: string;
  nota_cliente: string;
  pago: Pago | null;
  items: PedidoItem[];
  created_at: string;
  updated_at: string;
}

export interface CheckoutPayload {
  items: Array<{
    producto_id: string;
    cantidad: number;
    talla?: string;
  }>;
  direccion_entrega?: string;
  nota_cliente?: string;
}
