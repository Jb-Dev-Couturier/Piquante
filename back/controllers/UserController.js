import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

//Enregistrement nouvelle utilisateur
export const registerUser = async (req, res) => {
  //salt est la quatite de hachage de chaine de donnée
  const salt = await bcrypt.genSalt(10);
  //ajout du salt au password
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  const newUser = new UserModel({
    email: req.body.email,
    password: hashedPass,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: 'Nouvelle Utilisateur créé !' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Erreur d'enregistrements` + error.message });
  }
};

//connection avec un compte existant
export const login = async (req, res) => {
  const password = req.body.password;
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      //appel de bcrypt pour comparer le password utilisateur enregistre avec celui de la requete
      const validity = await bcrypt.compare(password, user.password);

      validity
        ? res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
              expiresIn: '24h',
            }),
          })
        : res.status(400).json('Mot de passe incorrect !');
    } else {
      res.status(404).json(`Cette utilisateur n'existe pas`);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Erreur d'enregistrements` + error.message });
  }
};
