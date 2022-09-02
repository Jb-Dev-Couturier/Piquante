import passwordSchema from "../models/passwordModels.js";

export const passwordCheck = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res
      .status(400)
      .json({
        message:
          'Le Mot de passe doit faire 10 caractère au moins, comprenant une majuscule, une mininuscule et un moins un chiffre.',
      });
  } else {
    next();
  }
};