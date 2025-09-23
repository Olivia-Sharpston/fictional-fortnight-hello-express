import 'dotenv/config'
import nodemailer from 'nodemailer'

//Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oksharpston0617@gmail.com',
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
  tls: {
    cipher:'SSLv3'
  }
});

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "oksharpston0617@gmail.com",
//       pass: process.env.GOOGLE_APP_PASSWORD,
//     },
//     tls: {
//         cipher:'SSLv3'
//     }
//   });

try {    
    const mailOptions = {
      from: 'oksharpston0617@gmail.com',
      to: 'barrycumbie@gmail.com',
      subject: 'in-class activity',
      text: 'Hey, Dr. Cumbie'
    };

    // await registrations.insertOne(req.body);
   
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
 
  } catch (error) {
    console.error('Error in /register:', error);
  } 