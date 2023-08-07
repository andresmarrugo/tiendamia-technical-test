# Tiendamia Tecnical Test - MongoDB and Mongoose with Next.js

Ese codigo se desarrollo usando Next.js, Mongoose, MongoBD Atlas.

## Enlace al proyecto desplegado en Vercel

https://tiendamia-technical-test.vercel.app/

## Configuration

### Step 1. se requiere la connection string de un MongoDB server para que el proyecto funcione en local

 MongoDB Atlas string example

```
mongodb+srv://<username>:<password>@my-project-abc123.mongodb.net/test?retryWrites=true&w=majority
```

For more details, follow this [MongoDB Guide](https://docs.mongodb.com/guides/server/drivers/) on how to connect to MongoDB.

### Step 2. nota - No se debe subir los archivos .env pero en este caso es necesario para poder probar 

Ene el archivo `.env` contiene la cadena de conexion de la base de datos

- `MONGODB_URI` 

### Step 3. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```
### Step 4. Ejecutar los seeder de la base de datos

es necesario ejecutar el script ```
npm run seed-db
```
este scrip se encarga de crear los datos de prueba


EL proyecto debe correr el la direccion [http://localhost:3000](http://localhost:3000)!