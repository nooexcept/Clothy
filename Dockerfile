FROM node:12.18-alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 8080
CMD [ "yarn", "dev" ]