const mongoose = require("mongoose")
require("dotenv").config()
const MONGOOSE_URL = process.env.MONGOOSE_URL
async function connectDB (){
    try {
        await mongoose.connect(MONGOOSE_URL)
        console.log("connexion à la base des données")
    } catch (error) {
        console.error("erreur lors de la connexion à la base des données", error)
    }
}

module.exports = connectDB
  
    