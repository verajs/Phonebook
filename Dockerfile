# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the frontend code
COPY phonebook-frontend ./phonebook-frontend

# Build the frontend and move it to the backend
RUN cd phonebook-frontend && npm install && npm run build && cp -r build ../

# Copy the rest of the application code
COPY . .

# Remove the node_modules directory to ensure fresh install
RUN rm -rf node_modules

# Install Node.js dependencies again to ensure correct architecture
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]