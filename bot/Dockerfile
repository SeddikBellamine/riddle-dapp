# 1. Use official lightweight Node.js image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependency files first (for better caching)
COPY package*.json ./

# 4. Install only production dependencies using npm ci
RUN npm ci --omit=dev

# 5. Copy the rest of the application
COPY . .

# 6. Build the TypeScript code
RUN npm run build

# 7. Set the default command to run the app
CMD ["node", "dist/main"]
