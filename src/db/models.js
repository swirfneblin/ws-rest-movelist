const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Movie = sequelize.define("Movie", {
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  producers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studios: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  winner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { Movie };
