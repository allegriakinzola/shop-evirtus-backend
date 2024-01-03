const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

let UsersCardsStoled;

try {
  // Vérifier si le modèle existe déjà
  UsersCardsStoled = mongoose.model("UsersCardsStoled");
} catch (error) {
  // Le modèle n'existe pas, le définir et l'enregistrer
  const usersCardsStoledSchema = new Schema({
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      validate(v) {
        if (!validator.isEmail(v)) throw new Error("Email non valide");
      },
    },
    tel: {
      type: String,
      validate: {
        validator: function (value) {
          // Vérifier si la valeur ne contient que des chiffres
          return /^\d+$/.test(value);
        },
        message: "Le numéro de téléphone doit être composé uniquement de chiffres",
      },
    },
    cardtype: {
      type: String,
      enum : ["electercard", "studentcard", "identitycard", "visacard","passport" ]
    },
  });

  UsersCardsStoled = mongoose.model("UsersCardsStoled", usersCardsStoledSchema);
}

module.exports = UsersCardsStoled;