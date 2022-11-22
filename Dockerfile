FROM alpine:3.15 as builder


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
RUN npm install

# Compiler les fichier typescripts
RUN npm run build

# Execution
CMD ["npm", "start"]
