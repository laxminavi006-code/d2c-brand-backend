const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Note = sequelize.define("Note", {
  note: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Note;