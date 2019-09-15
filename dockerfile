FROM node:10
WORKDIR /app/
COPY src/ tsconfig.json package-lock.json package.json ./
RUN npm ci
RUN npx tsc --project .
RUN npx webpack --mode production

FROM openjdk:11
RUN apt install -y curl \
  && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
  && apt install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh
WORKDIR /app/
COPY package-lock.json package.json ./
RUN npm ci --production
COPY --from=0 /app/dist/ /app/dist/
ENV NODE_ENV production
ENTRYPOINT ["node","--no-warnings","/app/dist/server/www"]
