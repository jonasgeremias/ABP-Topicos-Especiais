const { Clients, Documents } = require("../models");

const getFeldsReq = (req) => {
  return {
    nome_fantasia:req.body.nome_fantasia,
    email:req.body.email,
    razao_social:req.body.razao_social,
    cnpj:req.body.cnpj,
    telefone:req.body.telefone,
    inscricao_estadual:req.body.inscricao_estadual,
    inscricao_municipal:req.body.inscricao_municipal,
    endereco:req.body.endereco,
    bairro:req.body.bairro,
    cidade:req.body.cidade,
    estado:req.body.estado,
    cep:req.body.cep
  }
}

exports.listAll = async (req, res) => {
  // console.log(`olha tem alguém logado`, req.auth);

  try {
    const clients = await Clients.findAll({
      order: [["nome_fantasia", "ASC"]],
      // include: Documents,
    });

    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Clients.findOne({
      where: { id },
    });

    if (!!client) {
      res.json(client);
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const newClient = await Clients.create(
      getFeldsReq(req)
    );

    res.json(newClient);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// @pending fazer as proteções dos campos
exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const payload = {};
    
    const jsonData = getFeldsReq(req)

    Object.keys(jsonData).forEach((key) => {
        const value = jsonData[key];
        if (!!value) {
          payload[key] = value;
         }
    });

    const updatedClient = await Clients.update(payload, {
      where: { id },
    });

    res.json({ success: !!updatedClient && +updatedClient[0] > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClient = await Clients.destroy({
      where: { id },
    });

    res.json({ success: !!deletedClient });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
