//Permet de gérer les fichiers entrants dans les requêtes HTTP
import Multer from 'multer'

//recupere le format image
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

//renomme et enregistre dans le dosser images

const storage = Multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});


const multer = Multer({ storage }).single('image');
export default multer;