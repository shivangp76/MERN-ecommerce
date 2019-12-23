const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Models
const Product = require("../../models/Product");

// Get products for certain category
router.get("/category/:categoryID", (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.categoryID)) {
    Product.find({
        categoryID: mongoose.Types.ObjectId(req.params.categoryID)
      })
      .then(products => res.json(products))
      .catch(e => console.log(e));
  } else {
    res.json([]);
  }
});

module.exports = router;