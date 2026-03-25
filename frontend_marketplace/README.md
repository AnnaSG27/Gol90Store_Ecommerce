# Frontend Marketplace

Proyecto [Next.js](https://nextjs.org) bootstrapped con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Arquitectura

El proyecto sigue una **Scope Architecture** organizada por features de negocio. La carpeta `app/` es exclusivamente para routing (`page.tsx`, `layout.tsx`, etc.) — no debe contener lógica de negocio ni componentes.

```
app/                            # Solo routing (page.tsx, layout.tsx)

src/
  features/
    shopping-cart/
      shopping-cart.tsx          # Container principal
      components/
        CartList.tsx             # Container secundario
        CartItem.tsx             # Presentational
      services/
        CartService.ts
      hooks/
        useCart.ts
      models.ts

  shared/                       # Código compartido por 2+ features
    components/
    hooks/
    utils/

  components/
    ui/                         # Componentes genéricos de shadcn/ui

  infrastructure/               # API, auth, monitoring
```

