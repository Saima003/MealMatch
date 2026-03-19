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

module.exports = router;