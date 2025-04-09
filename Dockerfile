FROM nginx:alpine

# COPY ./build /var/www

# COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --production=true

# Copy all source code
COPY . .

# Build the app
RUN yarn build

CMD ["yarn", "start"]
