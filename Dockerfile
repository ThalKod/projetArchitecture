FROM alpine:3.15 as builder

RUN addgroup -S node && adduser -S node -G node

# installing nodejs and npm for the container
RUN apk add --update nodejs
RUN apk add --update npm

# Using this directory as working directory
WORKDIR cloudApp/

# Copy les fichiers dans le container
COPY . ./

# Ouvrir le port 8000
EXPOSE 8000

# Installer les modules npm
RUN npm i

# Compiler les fichier typescripts
RUN npm run build

USER node

# Execution
CMD ["npm", "start"]

FROM alpine:3.15 as runner

# installing nodejs and npm for the container
RUN apk add --update nodejs
RUN apk add --update npm

# Using this directory as working directory
WORKDIR cloudApp/

# Copier que ce dont on a besoin
COPY --from=builder --chown=node:node cloudApp/node_modules node_modules
COPY --from=builder --chown=node:node cloudApp/dist dist
COPY --from=builder --chown=node:node cloudApp/package.json ./

# Ouvrir le port 8000
EXPOSE 8000

# Execution
CMD ["npm", "start"]
