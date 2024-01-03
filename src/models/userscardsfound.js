const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { isEmail } = require("validator");

let UsersCardsFound;

try {
  // Vérifier si le modèle existe déjà
  UsersCardsFound = mongoose.model("UsersCardsFound");
} catch (error) {
  // Le modèle n'existe pas, le définir et l'enregistrer
  const usersCardsFoundSchema = new Schema({
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: "Adresse e-mail non valide",
      },
    },
    tel: {
      type: String,
    },
    cardtype: {
      type: String,
      enum : ["electercard", "studentcard", "identitycard", "visacard","passport" ]
    },
    nameusercardown: {
      type: String,
    },
    lastnameusercardown: {
      type: String,
    },
  });

  UsersCardsFound = model("UsersCardsFound", usersCardsFoundSchema);
}

module.exports = UsersCardsFound;