import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const authCheck = (req, res, next) => {
  try {
    //Extraction du token du header authorization et utilisation de split pour récupérer tous les éléments après l'espace du header
    const token = req.headers.authorization.split(' ')[1];
    //Décode le token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    //Extrait l'id utilisateur et compare à celui extrait du token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Id utilisateur invalide !';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide !'),
    });
  }
};