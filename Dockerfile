FROM node:18-alpine

RUN apk add --no-cache \
    wkhtmltopdf \
    ttf-dejavu \
    font-noto \
    font-noto-cjk \
    font-noto-emoji \
    fontconfig \
    ttf-mscorefonts-installer && fc-cache -f

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
