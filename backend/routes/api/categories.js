const express = require("express");
const router = express.Router();

// Models
const Category = require("../../models/Category");

// Get all categories
router.get("/", (req, res) => {
  Category.find()
    .sort({
      order: 1
    })
    .then(categories => res.json(categories))
    .catch(e => console.log(e));
});

module.exports = router;