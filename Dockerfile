FROM alpine:3.15 as builder

RUN apk add --update nodejs
RUN apk add --update npm

WORKDIR cloudApp/

COPY . ./

EXPOSE 8000

RUN npm install

RUN npm run build

CMD ["npm", "start"]
