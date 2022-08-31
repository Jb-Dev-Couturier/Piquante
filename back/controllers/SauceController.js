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
    res.status(500).json({ message: error });
  }
};

//update sauce (+image)
export const updateSauce = async (req, res) => {
  const sauceObject = req.file
    ? //si on veut modifier l'image
      {
        //alors on update
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : //sinon on envoie seulement la requete sans image modifier
      { ...req.body };
  try {
    const id = req.params.id;
    const sauce = await SauceModel.updateOne(
      { _id: id },
      { ...sauceObject, _id: id }
    );
    res.status(200).json({ message: 'Sauce modifiée' + sauce });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Pour Supprimer Une sauce
export const DeleteSauce = async (req, res) => {
  const id = req.params.id;

  try {
    const sauce = await SauceModel.findById(id);
    await SauceModel.deleteOne(sauce);
    res.status(200).json({ message: 'Sauce supprimée' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//
export const likeDislikeSauce = async (req, res, next) => {
  const like = req.body.like;

  //AJOUTER UN LIKE OU UN DISLIKE

  if (like === 1) {
    try {
      const sauce = await SauceModel.findOne({ _id: req.params.id });
      if (
        sauce.usersDisliked.includes(req.body.userId) ||
        sauce.usersLiked.includes(req.body.userId)
      ) {
        res.status(401).json({ message: 'Opération non autorisée !' });
      } else {
        await SauceModel.updateOne(
          { _id: req.params.id },
          {
            //Insère le userId dans le tableau usersLiked du modèle
            $push: { usersLiked: req.body.userId },
            //Ajoute le like
            $inc: { likes: +1 },
          }
        );
      }
      res.status(200).json({ message: "J'aime !" });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  if (like === -1) {
    try {
      const sauce = await SauceModel.findOne({ _id: req.params.id });
      if (
        sauce.usersDisliked.includes(req.body.userId) ||
        sauce.usersLiked.includes(req.body.userId)
      ) {
        res.status(401).json({ message: 'Opération non autorisée !' });
      } else {
        await SauceModel.updateOne(
          { _id: req.params.id },
          {
            //Insère le userId dans le tableau usersLiked du modèle
            $push: { usersDisliked: req.body.userId },
            //Ajoute le dislike
            $inc: { dislikes: +1 },
          }
        );
      }
      res.status(200).json({ message: "J'aime !" });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  //RETIRER SON LIKE OU SON DISLIKE

  if (like === 0) {
    SauceModel.findOne({ _id: req.params.id })
      .then((sauce) => {
        //Regarde si le userId est déjà dans le tableau usersliked/disliked
        if (sauce.usersLiked.includes(req.body.userId)) {
          SauceModel.updateOne(
            { _id: req.params.id },
            {
              //Retire le userId dans le tableau usersliked du modèle
              $pull: { usersLiked: req.body.userId },
              //Retire le likes
              $inc: { likes: -1 },
            }
          )
            .then(() => res.status(200).json({ message: "J'aime retiré !" }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.includes(req.body.userId)) {
          SauceModel.updateOne(
            { _id: req.params.id },
            {
              //Retire le userId dans le tableau usersDisliked du modèle
              $pull: { usersDisliked: req.body.userId },
              //Retire le dislikes
              $inc: { dislikes: -1 },
            }
          )
            .then(() =>
              res.status(200).json({ message: "Je n'aime pas retiré !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(404).json({ error }));
  }
};
