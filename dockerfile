FROM node:latest as builder

WORKDIR /app
COPY    package.json package-lock.json ./
ENV     NODE_ENV=prod
RUN     npm install
COPY    . .
RUN     npm run build


FROM nginx:latest
COPY --from=builder /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]