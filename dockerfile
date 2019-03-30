FROM openjdk:11
RUN apt install -y curl \
  && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
  && apt install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh
COPY ./dist /app/dist/
WORKDIR /app/
COPY package.json .
COPY package-lock.json .
RUN npm install --production
ENV NODE_ENV production
ENTRYPOINT ["npm", "start"]
