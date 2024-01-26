FROM node:lts-alpine as build
WORKDIR /usr/local/app/
COPY . .
RUN npm i --offline
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/app/browser /usr/share/nginx/html
EXPOSE 80
