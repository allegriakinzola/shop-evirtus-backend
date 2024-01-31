const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config()
const PORT = process.env.PORT || 8000;
const connectDB = require("./src/services/connectdb");
const routeuser = require("./routes/routeuser");
const app = express();
const cors = require("cors")

// Middlewares
app.use(logger('dev'));
app.use(express.json()); // Ajout du middleware express.json()
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

connectDB()
  .then(() => console.log("Traitement après la connexion à la base de données"))
  .catch(error => console.log("Erreur lors de la connexion à la base de données ", error));

app.use(routeuser);


app.get("/", (req, res)=>{
  res.send("app running")
})
app.listen(PORT, () => {
  console.log("Lancement de l'application sur le port 8000");
});