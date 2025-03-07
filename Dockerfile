
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY package*.json .
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
CMD ["npm" , "run", "start"]