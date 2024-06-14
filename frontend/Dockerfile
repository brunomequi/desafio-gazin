FROM node:lts

RUN npm cache clean --force

RUN npm install -g http-server
RUN npm install -g vite@^5.2.0

RUN mkdir /application

WORKDIR /application

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]