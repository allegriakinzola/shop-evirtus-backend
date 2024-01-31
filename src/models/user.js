const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { isEmail } = require("validator");

let User;

try {
  // Vérifier si le modèle existe déjà
  User = mongoose.model("User");
} catch (error) {
  // Le modèle n'existe pas, le définir et l'enregistrer
  const userSchema = new Schema({
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    status : {
      type: String,
      enum : ["admin", "client"]
    },
  });

  User = model("User", userSchema);
}

module.exports = User;