import { RiArchiveLine, RiFileList3Line, RiShirtLine } from "@remixicon/react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Pedidos recibidos",
    description:
      "Revisa pedidos que incluyen tus productos y actualiza su estado.",
    href: "/seller/orders",
    icon: RiFileList3Line,
  },
  {
    title: "Mis productos",
    description:
      "Administra precio, stock, estado e imagenes de tus publicaciones.",
    href: "/seller/products",
    icon: RiShirtLine,
  },
  {
    title: "Historial de compras",
    description: "Consulta pedidos que realizaste como cliente.",
    href: "/mis-pedidos",
    icon: RiArchiveLine,
  },
];

export default function SellerDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Panel vendedor
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          Gestion comercial
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Herramientas simples para gestionar pedidos recibidos y productos
          publicados.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {actions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="h-full border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <action.icon className="size-5" />
                </div>
                <CardTitle className="text-lg font-bold text-slate-950">
                  {action.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-600">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
