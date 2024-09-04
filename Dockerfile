FROM node:20-alpine as build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS=--max_old_space_size=6144

RUN corepack enable
COPY . /app
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm build

FROM node:20-slim

ENV HOST=0.0.0.0
ENV PORT=80
ENV LANGUAGE="en"

COPY --from=build /app /app
WORKDIR /app

RUN mkdir data

HEALTHCHECK --interval=30s --timeout=10s --start-period=1s --retries=3 \
    CMD wget --spider --timeout=1 http://${HOST}:${PORT}/health || exit 1

CMD node build