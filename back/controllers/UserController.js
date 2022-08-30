import UserModel from "../models/userModel.js";


//Enregistrement nouvelle utilisateur
export const registerUser = async (req,res)=>{
    const {email,password} = req.body
    const newUser = new UserModel({
      email,
      password,
    });

    try {
        await newUser.save()
        res.status(200).json({message: 'Nouvelle Utilisateur créé !' + newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Erreur d'enregistrements` + error.message })
    }
}
