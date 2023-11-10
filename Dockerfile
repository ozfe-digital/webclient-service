FROM node:19-alpine
ARG api_base_url
WORKDIR /app
COPY package*.json .
ENV CI=false
RUN npm i --silent --force
RUN npm config set legacy-peer-deps true
RUN export NODE_OPTIONS=--openssl-legacy-provider
COPY . .
EXPOSE 8080
CMD ["npm", "run", "start:prod"]