FROM node:18.16.1-alpine3.18

WORKDIR /app

# Install nodemon globally for hot reload
RUN npm install -g nodemon

# Copy package files and install dependencies at build time
COPY package*.json ./
RUN npm install

# Copy rest of the app source
COPY . .

EXPOSE 5000

CMD ["nodemon", "app.js"]
