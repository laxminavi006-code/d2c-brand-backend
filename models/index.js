const Brand = require("./brand.model");
const Note = require("./note.model");

Brand.hasMany(Note, { foreignKey: "brand_id", onDelete: "CASCADE" });
Note.belongsTo(Brand, { foreignKey: "brand_id" });

module.exports = { Brand, Note };