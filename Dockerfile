FROM node:22-alpine as build

WORKDIR /app

COPY . /app

RUN npm ci

RUN npm run build

# run nginx for serve frontend
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist .

CMD ["nginx", "-g", "daemon off;"]
