FROM node:20-slim as build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS=--max_old_space_size=4096

RUN corepack enable
COPY . /app
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm build

FROM node:20-alpine

ENV HOST=0.0.0.0
ENV PORT=80
ENV LANGUAGE="en"

COPY --from=build /app/build /
WORKDIR /

HEALTHCHECK --interval=1s --timeout=1s --start-period=1s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/ || exit 1

CMD node .