const mongoose = require("mongoose");
require("dotenv").config();

const Ingredient = require("./models/Ingredient");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for Seeding");

    const ingredients = [
      { name: "onion", category: "vegetable" },
      { name: "potato", category: "vegetable" },
      { name: "chicken", category: "meat" },
      { name: "egg", category: "protein" },
      { name: "milk", category: "dairy" },
      { name: "butter", category: "dairy" },
      { name: "salt", category: "spice" },
      { name: "sugar", category: "sweetener" },
      { name: "garlic", category: "vegetable" }
    ];

    await Ingredient.insertMany(ingredients);
    console.log("Ingredients Seeded ✅");

    process.exit();
  })
  .catch(err => console.log(err));