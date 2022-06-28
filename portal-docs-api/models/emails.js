'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Emails.init({
    client_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    data_envio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Emails',
  });
  return Emails;
};