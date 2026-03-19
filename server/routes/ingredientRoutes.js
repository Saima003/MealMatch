const express = require("express");
const router = express.Router();
const Ingredient = require("../models/Ingredient");

// GET all ingredients
router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find().select("-__v");
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔍 SEARCH INGREDIENTS
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    const ingredients = await Ingredient.find({
      name: { $regex: q, $options: "i" }
    }).select("-__v");

    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📂 GROUP BY CATEGORY
router.get("/grouped", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();

    const grouped = {};

    ingredients.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;