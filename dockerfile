FROM node:22
WORKDIR /usr/src/app
COPY . .
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 8080