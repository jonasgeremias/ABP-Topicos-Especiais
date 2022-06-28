'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    static associate(models) {
      models.Clients.belongsTo(models.Clients
        , {foreignKey: "client_id", }
      );
    }
  }

  Documents.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    data_validade: DataTypes.DATE,
    categoria: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Documents',
  });
  return Documents;
};