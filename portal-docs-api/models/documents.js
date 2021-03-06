'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Documents.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    data_validade: DataTypes.STRING,
    categoria: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    file_size: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Documents',
  });
  return Documents;
};