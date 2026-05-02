"use client";

import { RiCheckboxCircleLine } from "@remixicon/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StoreHeader } from "@/shared/components/StoreHeader";

function CheckoutSuccessContent() {
  const params = useSearchParams();
  const pedido = params.get("pedido");

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eefbf4_100%)]">
      <StoreHeader />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Card className="border-white/80 bg-white/95 shadow-xl shadow-emerald-950/5">
          <CardContent className="flex flex-col items-center gap-5 px-6 py-14 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <RiCheckboxCircleLine className="size-9" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-slate-950">
                Pedido confirmado
              </h1>
              <p className="text-sm leading-7 text-slate-600">
                El pago simulado fue aprobado y el inventario se actualizo en el
                backend.
              </p>
              {pedido && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Referencia {pedido.slice(0, 8)}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-500">
                <Link href="/mis-pedidos">Ver mis pedidos</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/productos">Seguir comprando</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
