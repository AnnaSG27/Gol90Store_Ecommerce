ARG NEXT_PUBLIC_API_URL=http://localhost:8000

FROM oven/bun:1-slim AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1-slim AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["bun", "run", "dev", "--", "--hostname", "0.0.0.0"]

FROM oven/bun:1-slim AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
COPY --from=builder /app/package.json /app/bun.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
EXPOSE 3000
CMD ["bun", "run", "start", "--", "--hostname", "0.0.0.0", "--port", "3000"]
