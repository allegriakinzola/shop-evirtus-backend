const express = require('express');
const router = express.Router();
const UsersCardsFound = require("../src/models/userscardsfound");
const UsersCardsStoled = require("../src/models/userscardsstoled")
const nodemailer = require("nodemailer")


router.get("/userscardsfound", async (req, res) => {
  try {
    const users = await UsersCardsFound.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/userscardsfound", async (req, res) => {
  const user = new UsersCardsFound({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    tel: req.body.tel,
    cardtype: req.body.cardtype,
    nameusercardown: req.body.nameusercardown,
    lastnameusercardown: req.body.lastnameusercardown,
  });

  try {
    await user.save();
    const userFound = await UsersCardsStoled.findOne({
      name: req.body.nameusercardown,
      lastname: req.body.lastnameusercardown,
      cardtype: req.body.cardtype
    });

    if (userFound) {
      res.status(201).json("exist");
      (async function sendmail() {
        const mailOptions = {
          from: 'allegriakinzolaessaie@gmail.com',
          to: user.email,
          subject: "Carte trouvrée",
          text: "Votre carte a été trouvée sur notre site."
        };

        const transporter = nodemailer.createTransport({
          service:"gmail",
          auth: {
            user: "allegria.kinzolaessaie@gmail.com",
            pass: "pktq gahw bddt deua"
          }
        });

        await transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Mail envoyé avec succès.");
          }
        });

      })();
    } else {
      res.status(201).json("notexist");
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;