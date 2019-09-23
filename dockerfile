FROM node:10
WORKDIR /app/
COPY webpack.config.js package-lock.json package.json ./
COPY src ./src
RUN npm i
RUN npx loadAssets
RUN npx tsc --project ./src/server
RUN npx webpack --mode production


FROM openjdk:11
RUN apt install -y curl \
  && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
  && apt install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh
WORKDIR /app/
COPY package-lock.json package.json ./
RUN npm i --production
COPY --from=0 /app/dist/ /app/dist/
ENV NODE_ENV production
ENTRYPOINT ["node","--no-warnings","/app/dist/server/bin/www"]
