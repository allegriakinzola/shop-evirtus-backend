const mongoose = require("mongoose")
const url = "mongodb+srv://allegriakinzola:ik3Afhe2FYbqKW0w@client.to8qzsu.mongodb.net/local_library?retryWrites=true&w=majority"

async function connectDB (){
    try {
        await mongoose.connect(url)
        console.log("connexion à la base des données")
    } catch (error) {
        console.error("erreur lors de la connexion à la base des données", error)
    }
}

module.exports = connectDB
  
    