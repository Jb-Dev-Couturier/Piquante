//Import
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Variable
const app = express();
dotenv.config();

//middleware
app.use(bodyParser.json({ limit: '30mb', extended: true })); //limite les données par requete
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//Connection DataBase et serveur
const DBurl = process.env.MONGO_DB_URL;
const PORT = process.env.PORT;
mongoose
  .connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true }) // Parametre de connexion recommandation mongoDB

  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Connection MongoDB etablie / / Serveur demarée sur http://localhost:${PORT}/`
      )
    )
  );
