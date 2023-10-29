FROM node:19-alpine
ARG api_base_url
WORKDIR /app
COPY package*.json .
RUN npm i --silent --force
COPY . .
EXPOSE 8080
CMD ["npm", "run", "start"]