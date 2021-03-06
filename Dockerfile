# Using multi-stage build (supported Docker 17 and later)
# Original image 225MB and now 71MB

# ------ Stage 1 (build) --------
FROM node:alpine AS assets

# Create app directory
WORKDIR /usr/src/app

# Copy dependencies info for installation
COPY package*.json ./

# Install depedencies
RUN npm install

# Copy remaining source code
COPY . .

# Create ./build folder for deploy later
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# ------ Stage 2 (release) ------
FROM node:10-alpine AS release

WORKDIR /usr/src/app

COPY --from=assets /usr/src/app/node_modules ./node_modules
COPY --from=assets /usr/src/app/build ./build/

CMD [ "node", "build/server.js" ]
