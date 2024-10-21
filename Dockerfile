FROM node:22-alpine AS runtime
WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs