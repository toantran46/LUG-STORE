const nodemailer = require("nodemailer");
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_ACCOUNT_LUG, // generated ethereal user
        pass: process.env.PASSWORD_ACCOUNT_LUG, // generated ethereal password
    },
});

// send mail with defined transport object
module.exports.sendMail = ({ to, subject, html }) => {
    console.log({
        to, subject, html
    })
    return new Promise(async (resolve, reject) => {
        try {
            await transporter.sendMail({
                from: process.env.USER_ACCOUNT_LUG, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html: html, // html body
            },);
            resolve(true)
        } catch (error) {
            reject(error)
            console.log(error)
        }
    })
}