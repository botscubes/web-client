# build Vue app
FROM node:19-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . /app

RUN npm run build

# run nginx for serve frontend
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

CMD ["nginx", "-g", "daemon off;"]