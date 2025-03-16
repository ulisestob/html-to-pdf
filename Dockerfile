FROM node:18-slim

RUN apt-get update && apt-get install -y \
    wkhtmltopdf \
    fonts-dejavu \
    fontconfig \
    && apt-get clean

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
