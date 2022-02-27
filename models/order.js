'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Film, { 
        foreignKey: 'filmId' 
      }); 
      this.belongsTo(models.User, { 
        foreignKey: 'userId' 
      });
    }
  }
  Order.init({
    filmId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    outDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};