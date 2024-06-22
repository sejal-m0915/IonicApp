FROM node:21-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install @ionic/cli 
RUN npm install
COPY ./ /app/
RUN npm run build_prod
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]