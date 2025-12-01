'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // example: Presensi.belongsTo(models.User, { foreignKey: 'userId' });
      // 1 Presensi dimiliki oleh 1 User
      Presensi.belongsTo(models.User, { 
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  Presensi.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: true, // checkOut can be null initially
    }
  }, {
    sequelize,
    modelName: 'Presensi',
  });
  return Presensi;
};