# build step
FROM node:19-alpine3.15 as build
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

# release step
FROM nginx:1.21.5-alpine as release
COPY --from=build /app/build /usr/share/nginx/html/
EXPOSE 3000 80 443
CMD ["nginx", "-g", "daemon off;"]


