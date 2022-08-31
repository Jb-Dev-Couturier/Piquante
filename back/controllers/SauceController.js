import SauceModel from '../models/sauceModel.js';
import mongoose from 'mongoose';
import fs from 'fs';

// controller pour obtenir les sauces

export const getAllSauces = async (req, res) => {
  //methode find pour recuperer les sauces de la DB
  const allSauce = await SauceModel.find();
  try {
    res.status(200).json(allSauce);
  } catch (error) {
    res.status(500).json(error);
  }
};

// controller pour avoir une sauce

export const getSauce = async (req, res) => {
  const id = req.params.id;
  try {
    //methode findBYiD pour recuperer la sauce demander
    const sauce = await SauceModel.findById(id);
    res.status(200).json(sauce);
  } catch (error) {
    res.status(500).json(error);
  }
};

//crée une nouvelle sauces

export const createSauces = async (req, res) => {
  //Création d'une constante pour obtenir un objet utilisable
  const sauceObject = JSON.parse(req.body.sauce);
  //Suppression de l'_id envoyé par le front-end
  delete sauceObject._id;
  //Conversion de l'objet "Sauce" en une chaîne "sauce"
  const sauce = new SauceModel({
    ...sauceObject,
    //Utilisation de l'URL complète de l'image
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [' '],
    usersdisLiked: [' '],
  });
  //Enregistre dans la base de données
  try {
    await sauce.save();
    res.status(200).json('Nouvelle Sauce enregistrée');
  } catch (error) {
    res.status(500).json(error);
  }
};

//update sauce (+image)
export const updateSauce = async (req,res)=>{
  const sauceObject = req.file
  //si on veut modifier l'image
    ? {
      //alors on update
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
      //sinon on envoie seulement la requete sans image modifier
    : { ...req.body };
    try {
    const sauce = await SauceModel.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id });
      res.status(200).json({ message: 'Sauce modifiée' });
  } catch (error) {
    res.status(400).json({ error });
  }
}
