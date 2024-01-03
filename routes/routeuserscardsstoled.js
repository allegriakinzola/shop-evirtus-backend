const express = require('express');
const router = express.Router();
const UsersCardsStoled = require("../src/models/userscardsstoled");
const UsersCardsFound = require("../src/models/userscardsfound")
const nodemailer = require("nodemailer")

router.get("/userscardsstoled", async (req, res) =>{
  try {
    const users = await UsersCardsStoled.find()
    res.status(201).json(users)
  } catch (error) {
    res.status(500).json({message : error.message})
  }
})

router.post("/userscardsstoled", async (req, res) =>{
  const user = new UsersCardsStoled({
    name : req.body.name,
    lastname : req.body.lastname,
    email : req.body.email,
    tel : req.body.tel,
    cardtype : req.body.cardtype
  })
  try {
    await user.save()
    const foundUser = await UsersCardsFound.findOne({
      name : req.body.name, 
      lastname : req.body.lastname, 
      cardtype : req.body.cardtype
    })
    if(foundUser){
      res.status(201).json("exist");
      (async function sendmail (){
        const mailOptions = {
          from : "allegriakinzolaessaie@gmail.com",
          to : user.email,
          subject : "carte trouvée",
          text : "votre carte a étée trouvée"
        };

        const transporter = nodemailer.createTransport({
          service : "gmail",
          auth: {
            user: "allegria.kinzolaessaie@gmail.com",
            pass: "pktq gahw bddt deua"
          }
        });

        transporter.sendMail(mailOptions, (err) =>{
          if (err){
            console.log(err)
          }else{
            console.log("mail envoyé avec succès")
          }
        });
      })();
    }else{
      res.status(201).json("notexist");
    }
  } catch (error) {
    res.status(500).json({message : error.message});
  }
})





module.exports = router