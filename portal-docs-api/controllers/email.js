const { Emails, Clients } = require("../models");
const { nodemailerTransporter } = require("../utils")

const getFeldsReq = (req) => {
  return {
    title: req.body.title,
    message: req.body.message
  }
}

const sendEmail = async (req, res) => {
  const { id } = req.params;
  try {
    let formEmail = getFeldsReq(req);

    // Lendo o usuário no banco
    const client = await Clients.findOne({
      where: { id },
    });

    // Setando o envio do email 
    if (!!client) {
      formEmail.email = client.email;
      formEmail.nome_fantasia = client.nome_fantasia;
      const date = new Date();
      formEmail.data_envio = date.toISOString()
      formEmail.client_id = id
      formEmail.status = "Enviando"

      // Enviando de forma assincrona 
      var mailOptions = {
        from: 'abp_portal_docs@hotmail.com',
        to: formEmail.email,
        subject: formEmail.title,
        text: formEmail.message
      };

      // formEmail.status = "Enviando"
      // const newEmail = await Emails.create(formEmail);
      // console.info(newEmail)
      // res.status(200).json(newEmail);

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
        res.status(200).json(newEmail);
      });

    } else {
      console.error({ error: "Cliente não encontrado" });
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno" });
  }
}

exports.sendEmail = sendEmail