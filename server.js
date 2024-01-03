const express = require("express")
const port = 8000
const app = express()

const connectDB = require("./src/services/connectdb")
const User = require("./src/models/user")


connectDB()
.then(()=> console.log("traitement après la connexion à la base des données"))
.catch(error => console.log("erreur lors de la connexion à la base des données ", error))


app.post("/todos", (req, res, next) =>{
    res.send("salut")
})

app.listen(port, ()=>{
    console.log("lancement de l'application sur le port 8000")
})