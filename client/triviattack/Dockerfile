FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install --legacy-peer-deps
CMD ["npm", "run", "start"]