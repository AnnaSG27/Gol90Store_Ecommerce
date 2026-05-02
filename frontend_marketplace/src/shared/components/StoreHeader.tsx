"use client";

import { RiShoppingCart2Line, RiUser3Line } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCart } from "@/features/cart/CartContext";
import { BRAND_LOGO_PRIMARY } from "@/features/services/catalog-assets";
import { useAuth } from "@/infrastructure/auth/AuthContext";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Catalogo" },
  { href: "/carrito", label: "Carrito" },
] as const;

export function StoreHeader() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { token, perfil } = useAuth();
  const canSell =
    perfil?.tipo_usuario === "freelancer" || perfil?.tipo_usuario === "ambos";
  const navLinks = [
    ...links,
    ...(token ? [{ href: "/mis-pedidos", label: "Pedidos" }] : []),
    ...(canSell ? [{ href: "/seller", label: "Vendedor" }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img
            src={BRAND_LOGO_PRIMARY}
            alt="Gol90 Store"
            className="size-12 rounded-2xl border border-emerald-100 bg-white object-cover shadow-sm"
          />
          <div>
            <p className="text-lg font-black tracking-tight text-slate-950">
              Gol90 Store
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">
              Camisetas de futbol
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 p-1 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-950",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/carrito"
            className="relative inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
          >
            <RiShoppingCart2Line className="size-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            href={token ? "/profile" : "/login"}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
          >
            <RiUser3Line className="size-4" />
            {token ? "Mi cuenta" : "Ingresar"}
          </Link>
        </div>
      </div>
    </header>
  );
}
