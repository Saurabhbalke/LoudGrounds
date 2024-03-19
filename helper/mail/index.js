const nodemailer = require('nodemailer');


module.exports = {
  /**
   * @param {string} subject => a string containing subject of mail
   * @param {string} text => a string containing text of mail
   * @param {string} fromName => a string containing sender name
   * @param {string} toEmail => a string containing sender name
   * @param {array} attachements => a array containing attachment
   * @returns mail response or throw err
   */
  sendMail: async (
    subject,
    text,
    toEmail,
    attachements = [],
    isHtml = true,
  ) => {
    
    // if (process.env.ENVTYPE == 'development') {
    //   subject = 'Test ' + subject;
    // }

    const newtransporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      secureConnection: true,
      connectionTimeout: 10000,
      requireTLS: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    var mailOptions = {
      from: {
        name: 'Loudgrounds',
        address: "noreplyloudgrounds@gmail.com",
      },
      to: toEmail,
      subject: subject,
      bcc: [],
    };
    isHtml ? (mailOptions.html = text) : (mailOptions.text = text);

    if (attachements.length) {
      mailOptions.attachments = attachements;
    }

    let mailResult = await newtransporter
      .sendMail(mailOptions)
      .then((info) => info)
      .catch((err) => {
        throw err;
      });
    return mailResult;
  },
};
