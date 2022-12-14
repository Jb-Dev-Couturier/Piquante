//Import
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';

//upload des routes
import userRoutes from './routes/userRoute.js';
import saucesRoutes from './routes/sauceRoute.js';


//Variable
const app = express();


//Utilisation du __dirname avec ES_modules (https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(bodyParser.json({ limit: '30mb', extended: true })); //limite les données par requete
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
dotenv.config();

//Gère la ressource "images" de manière statique à chaque fois qu'elle reçoit une requête vers la route "/images"
app.use('/images', express.static(path.join(__dirname, 'images')));
//normalisation du port pour le rendre stable (https://www.easy-micro.org/express.php&id=1163)
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Améliorez server.js pour le rendre plus stable (https://www.easy-micro.org/express.php&id=1163)
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Connection DataBase et serveur
const DBurl = process.env.MONGO_DB_URL;
mongoose
  .connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true }) // Parametre de connexion recommandation mongoDB

  .then(() =>
    server.listen(port, () =>
      console.log(
        `Connection MongoDB etablie / / Serveur demarée sur http://localhost:${port}/` //serveur demarée correctement
      )
    )
  )
  .catch((error) => console.log(`Probleme de connexion` + ' : ' + error)); //catch de l'erreur en cas de probleme

//Creation des routes utile
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);


