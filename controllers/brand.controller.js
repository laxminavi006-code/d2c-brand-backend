const { Brand, Note } = require("../models");
const { validateStatusTransition } = require("../services/brand.service");

// CREATE BRAND
exports.createBrand = async (req, res) => {
  try {
    const { brand_name, founder_name, category, monthly_revenue, website } = req.body;

    if (!brand_name || !founder_name || !category) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    if (monthly_revenue && monthly_revenue < 0) {
      return res.status(400).json({ error: "Revenue must be >= 0" });
    }

    const brand = await Brand.create({
      brand_name,
      founder_name,
      category,
      monthly_revenue,
      website,
    });

    res.status(201).json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL (with filters + pagination)
exports.getBrands = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;

    const where = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const brands = await Brand.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE BRAND
exports.getBrandById = async (req, res) => {
  const brand = await Brand.findByPk(req.params.id, {
    include: Note,
  });

  if (!brand) return res.status(404).json({ error: "Not found" });

  res.json(brand);
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);

  if (!brand) return res.status(404).json({ error: "Not found" });

  try {
    validateStatusTransition(brand.status, req.body.status);
    brand.status = req.body.status;
    await brand.save();
    res.json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ADD NOTE
exports.addNote = async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);

  if (!brand) return res.status(404).json({ error: "Brand not found" });

  if (!req.body.note)
    return res.status(400).json({ error: "Note cannot be empty" });

  const note = await Note.create({
    note: req.body.note,
    brand_id: brand.id,
  });

  res.status(201).json(note);
};

// SUMMARY
exports.getSummary = async (req, res) => {
  const total = await Brand.count();

  const statuses = ["SUBMITTED", "UNDER_REVIEW", "SHORTLISTED", "ACCEPTED", "REJECTED"];
  let result = { total };

  for (let s of statuses) {
    result[s.toLowerCase()] = await Brand.count({ where: { status: s } });
  }

  res.json(result);
};