# Utiliza una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Copia los archivos package.json y package-lock.json e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación cuando el contenedor se inicie
CMD ["node", "server.js"]