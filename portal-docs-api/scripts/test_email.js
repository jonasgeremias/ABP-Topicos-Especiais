const { Emails, Clients } = require("../models");
const { nodemailerTransporter } = require("../utils")

const getFeldsReqTeste = (req) => {
  return {
    title: "Documento vencido - Portal Docs",
    message: "Você tem um documento vencido."
  }
}

const sendEmailTeste = async () => {
  const id = 1
  try {
    let formEmail = getFeldsReqTeste();

    // Lendo o usuário no banco
    const client = await Clients.findOne({
      where: { id },
    });

    // Setando o envio do email 
    if (!!client) {
      formEmail.email = "jonasgeremiasjj@gmail.com"; //client.email;
      formEmail.nome_fantasia = client.nome_fantasia;
      const date = new Date();
      formEmail.data_envio = date.toISOString()
      formEmail.client_id = id
      formEmail.status = "Enviando"

      // Enviando de forma assincrona 
      var mailOptions = {
        from: 'jonasgeremias@hotmail.com',
        to: formEmail.email,
        subject: formEmail.title,
        text: formEmail.message
      };

      formEmail.status = "Enviando"
      const newEmail = await Emails.create(formEmail);

      await nodemailerTransporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          formEmail.status = "Erro no envio"
          console.error(error);
        } else {
          formEmail.status = "Enviado"
          console.info('Email sent: ' + info.response);
        }

        const newEmail = await Emails.create(formEmail);
        console.info(newEmail)
      });
    } else {
      console.error({ error: "Cliente não encontrado" });
    }
  } catch (err) {
    console.error(err);
  }
}

sendEmailTeste()