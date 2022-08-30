import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

//Enregistrement nouvelle utilisateur
export const registerUser = async (req, res) => {
  //salt est la quatite de hachage de chaine de donnée
  const salt = await bcrypt.genSalt(10);
  //ajout du salt au password
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  //hachage du mail avec crypto (methode sur documentation crypto)
  const hashedEmail = CryptoJS.HmacSHA512(
    req.body.email,
    process.env.SECRET_CRYPTOJS_TOKEN
  ).toString(CryptoJS.enc.Base64);

  const newUser = new UserModel({
    email: hashedEmail,
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

export const login = async (req,res)=>{

}
