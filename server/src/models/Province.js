const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    "Province",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lon: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cantMun: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
}
