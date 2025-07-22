FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g serve

COPY . .

EXPOSE 3001

CMD ["serve", "-s", ".", "-l", "3001"]