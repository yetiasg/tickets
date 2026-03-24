FROM node:24.14.0-alpine AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable

WORKDIR /app

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build
RUN pnpm prune --prod

FROM node:24.14.0-alpine AS runtime

ENV NODE_ENV=production
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN addgroup -S nodejs && adduser -S nestjs -G nodejs
RUN corepack enable

WORKDIR /app

COPY --chown=nestjs:nodejs --from=build /app/node_modules ./node_modules
COPY --chown=nestjs:nodejs --from=build /app/dist ./dist
COPY --chown=nestjs:nodejs --from=build /app/package.json ./package.json

USER nestjs

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
