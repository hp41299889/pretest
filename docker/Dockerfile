FROM node:18-alpine
WORKDIR /app
COPY . .
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD pnpm start