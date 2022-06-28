const { Documents, Clients } = require("../models");

/*
nome:string,
descricao:string,
client_id:integer,
data_validade:date,
categoria:string,
filename:string,
path:string
*/

const getFeldsReq = (req) => {
  const form = JSON.parse(req.body.form)
  console.log(form)

  // @pending ver com o Lucas o por quê do form e não body.
  let data = {
    nome: form.nome,
    descricao: form.descricao,
    client_id: parseInt(form.client_id),
    data_validade:form.data_validade,
    categoria:form.categoria,
  }

  // @pending melhorar esse if 
  if ('file' in req) {
    if ('size' in req.file) {
      if (req.file.size != 0) {
        data.filename = req.file.originalname,
        data.path = req.file.path,
        data.file_size = parseInt(req.file.size)
      }
    }
  }
  
  return data
}

exports.listAll = async (req, res) => {
  try {
    const documents = await Documents.findAll({
      order: [["nome", "ASC"]],
      // include: Documents,
    });

    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Documents.findOne({
      where: { id },
    });

    if (!!document) {
      res.json(document);
    } else {
      res.status(404).json({ error: "Documento não encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// @audit colocar doc
exports.create = async (req, res) => {
  try {
    const newDocument = await Documents.create(
      getFeldsReq(req)
    );
    
    res.json(newDocument);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// @pending fazer as proteções dos campos
exports.update = async (req, res) => {
  const { id } = req.params;
  // @audit colocar doc
  // const document_file = !!req.file ? req.file.filename : null;

  try {
    const payload = {};

    const jsonData = getFeldsReq(req)

    Object.keys(jsonData).forEach((key) => {
        const value = jsonData[key];
        if (!!value) {
          payload[key] = value;
         }
    });

    // @audit colocar doc
    // if (!!document_file) {
    //   payload.document_file = document_file;
    // } else if ("document_file" in req.body && !req.body.document_file) {
    //   payload.document_file = null;
    // }

    const updatedDocument = await Documents.update(payload, {
      where: { id },
    });

    res.json({ success: !!updatedDocument && +updatedDocument[0] > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  
  // @audit excluir documento
  
  try {
    const deletedDocument = await Documents.destroy({
      where: { id },
    });

    res.json({ success: !!deletedDocument });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
