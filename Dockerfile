FROM node:alpine
WORKDIR /app
COPY . .
ENV MONGODB_URI=$MONGODB_URI
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
