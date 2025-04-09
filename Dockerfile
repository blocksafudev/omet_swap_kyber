#FROM nginx:alpine

# COPY ./build /var/www

# COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Set working directory
FROM node:20.11.0-alpine
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install ALL dependencies (including dev dependencies)
RUN yarn install

# Copy all source code
COPY . .

# Build the app (including i18n tasks)
RUN yarn i18n:extract && yarn i18n:compile && yarn build

# For production, we can optionally prune dev dependencies
RUN yarn install --production=true

CMD ["yarn", "start"]
