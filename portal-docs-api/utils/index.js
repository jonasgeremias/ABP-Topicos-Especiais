var nodemailer = require('nodemailer');

exports.nodemailerTransporter = nodemailer.createTransport({
  //host: 'smtp.mail.yahoo.com',
  //port : 587,
  //secure: false,
  service:"Hotmail",
  auth: {
    user: 'abp_portal_docs@hotmail.com',
    pass: 'portal_docs123'
  },
  // logger: true,
  // tls : {
  //   rejectUnauthorized: false
  // }
});