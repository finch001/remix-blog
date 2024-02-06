FROM node:20

COPY . /app
WORKDIR /app

RUN npm i -g pnpm
RUN pnpm i --registry=https://registry.npmmirror.com
RUN pnpm run build

EXPOSE 3000
ENTRYPOINT ["npm", "start"]