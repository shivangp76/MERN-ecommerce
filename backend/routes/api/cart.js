const express = require("express");
const router = express.Router();

// Models
const Category = require("../../models/Category");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

// Get Cart
router.get("/", (req, res) => {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  res.json(cart);
});

// Update Cart (add, reduce, or remove)
/*
INPUT:
params: id
body: action, SKU (optional)

OUTPUT:
cart object

ERROR CASES:
- SOLVED: product given without SKU but it needs one
- SOLVED: product given with incorrect SKU but it needs one
- SOLVED: product given with SKU but it doesn't need one
*/
router.patch("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (product.variants && !req.body.SKU) throw new Error("SKU is required");
      const SKU = product.variants ? req.body.SKU : undefined;
      const cart = new Cart(req.session.cart ? req.session.cart : {});
      switch (req.body.action) {
        case "add":
          SKU ? cart.add(product, SKU) : cart.add(product);
          break;
        case "reduce":
          SKU ? cart.reduce(product._id, SKU) : cart.reduce(product._id);
          break;
        case "remove":
          SKU ? cart.remove(product._id, SKU) : cart.remove(product._id);
          break;
      }
      return cart;
    })
    .then(cart => {
      Category.findOne({
          title: "Lunch Special"
        })
        .then(category => {
          cart.setContainsLunchItem(category._id);
          req.session.cart = cart;
          res.json(cart);
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

module.exports = router;