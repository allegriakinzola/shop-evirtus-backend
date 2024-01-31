const express = require('express');
const router = express.Router();
const Users = require("../src/models/user");


router.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/postuser", async (req, res) => {
  const user = new Users({
    name : req.body.name,
    lastname : req.body.lastname,
    password : req.body.password,
    email: req.body.email,
    status : req.body.status
  });

  try {
    await user.save();
    res.status(201).json("l'utilisateur enregistrer avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.post("/login", async (req, res) => {
  const {email, password} = req.body
  try {
    const userFound = await Users.findOne({ email, password });
    if (userFound) {
      res.status(201).json(userFound);
      console.log('user is login')
    } else {
      res.status(201).json("usernotexist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;