const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Brand = sequelize.define("Brand", {
  brand_name: { type: DataTypes.STRING, allowNull: false },
  founder_name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  monthly_revenue: { type: DataTypes.INTEGER, defaultValue: 0 },
  website: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM(
      "SUBMITTED",
      "UNDER_REVIEW",
      "SHORTLISTED",
      "ACCEPTED",
      "REJECTED"
    ),
    defaultValue: "SUBMITTED",
  },
});

module.exports = Brand;