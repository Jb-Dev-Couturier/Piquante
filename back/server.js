//Import 
import express from 'express'
import dotenv from 'dotenv';


//Variable
const app = express()
dotenv.config();
const PORT = process.env.PORT;

//connection serveur
app.listen(PORT, () =>
  console.log(`Serveur demarée sur http//http://localhost:${PORT}/`)
);