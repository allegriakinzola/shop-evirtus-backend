const mongoose = require("mongoose")
async function connectDB (){
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("connexion à la base des données")
    } catch (error) {
        console.error("erreur lors de la connexion à la base des données", error)
    }
}

module.exports = connectDB
  
    