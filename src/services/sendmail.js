const nodemailer = require("nodemailer")

async function sendmail(user, userfound) {
    const mailOptions = {
      from: 'allegriakinzolaessaie@gmail.com',
      to: `${user.email}, ${userfound.email}`,
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

  }

  module.exports = sendmail