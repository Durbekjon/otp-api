# Use the official Node.js image as a parent image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate
RUN npm run prisma:generate

# Build the NestJS application
RUN npm run build

# Use a smaller image for the final stage
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/wait-for-postgres.sh ./ 

# Install only production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Install PostgreSQL client to use pg_isready
RUN apk add --no-cache postgresql-client

# Reinstall bcrypt within the Docker container
RUN apk add --no-cache make gcc g++ python3 \
    && npm rebuild bcrypt --build-from-source \
    && apk del make gcc g++ python3

# Copy .env file
COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["./wait-for-postgres.sh", "postgres-db", "npm", "run", "start:prod"]
