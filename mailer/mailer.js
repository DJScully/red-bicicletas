const { model } = require("mongoose");
const nodeMailer = require("nodemailer");

var mainConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'stephania.baumbach@ethereal.email',
        pass: 'wXynhYJN9WbhNjvZb3'
    }
}

module.exports = nodeMailer.createTransport(mainConfig); 