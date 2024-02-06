FROM node:20

COPY . /app
WORKDIR /app

RUN npm i 
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "start"]