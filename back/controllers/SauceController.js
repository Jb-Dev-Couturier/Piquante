import SauceModel from '../models/sauceModel.js'
import mongoose from 'mongoose'
import fs from 'fs'


// controller pour obtenir les sauces

export const getAllSauces = async (req,res) =>{
    SauceModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('error to get data' + err);
  })
};

// controller pour avoir une sauce

export const getSauce = async (req,res)=>{
    const id = req.params.id
}


//crée une nouvelle sauces

export const createSauces = async (req,res)=>{
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
}