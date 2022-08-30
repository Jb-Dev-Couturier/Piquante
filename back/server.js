//Import
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js'


//Variable
const app = express();


//middleware
app.use(bodyParser.json({ limit: '30mb', extended: true })); //limite les données par requete
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
dotenv.config();



//Connection DataBase et serveur
const DBurl = process.env.MONGO_DB_URL;
const PORT = process.env.PORT;
mongoose
  .connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true }) // Parametre de connexion recommandation mongoDB

  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Connection MongoDB etablie / / Serveur demarée sur http://localhost:${PORT}/` //serveur demarée correctement
      )
    )
  ).catch((error)=>console.log(`Probleme de connexion`+' : '+error)) //catch de l'erreur en cas de probleme

  //Creation des routes utile

  app.use('/api/auth', userRoutes);
