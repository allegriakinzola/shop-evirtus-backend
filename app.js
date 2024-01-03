const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require("./src/services/connectdb");
const routeuserscardsstoled = require("./routes/routeuserscardsstoled");
const routeuserscardsfound = require("./routes/routeuserscardsfound")
const PORT = 8000;
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

app.use(routeuserscardsstoled);
app.use(routeuserscardsfound)

app.listen(PORT, () => {
  console.log("Lancement de l'application sur le port 8000");
});