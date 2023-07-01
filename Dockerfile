FROM node:20-alpine

WORKDIR /app

# Setup a path for using local npm packages
RUN mkdir -p /opt/node_modules

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install

COPY . .

RUN npm run dev
# server build needs to run after client build because the client build using Vite
# removes the dist/ folder before compiling its code

EXPOSE 3001

CMD ["npm", "start"]