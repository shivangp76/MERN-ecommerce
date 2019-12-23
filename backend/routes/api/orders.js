const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const rp = require("request-promise");
const mongoose = require("mongoose");
const validator = require("validator");

const { escape, normalizeEmail } = validator;

// Models
const Order = require("../../models/Order");
const Product = require("../../models/Product");

const containsValidProducts = items => {
  var isValid = true;
  var i = 0;
  while (isValid) {
    if (item[i].hasOwnProperty("SKU")) {
      Product.find({
        _id: mongoose.Types.ObjectId(items[i]["_id"]),
        title: items[i]["title"],
        variants: {
          SKU: items[i]["SKU"],
          price: items[i]["price"]
        }
      })
        .then(products => {
          if (products.length === 0) isValid = false;
        })
        .catch(e => console.log(e));
    } else {
      Product.find({
        _id: mongoose.Types.ObjectId(items[i]["_id"]),
        title: items[i]["title"],
        price: items[i]["price"]
      })
        .then(products => {
          if (products.length === 0) isValid = false;
        })
        .catch(e => console.log(e));
    }
  }
  return isValid;
};

// Create new order
router.post("/", async (req, res) => {
  const {
    name,
    phone,
    email,
    notes,
    pickupType,
    pickupDay,
    pickupTime,
    paymentType,
    items,
    totalQty,
    totalPrice
  } = req.body;
  const id = mongoose.Types.ObjectId();

  // Sanitize Data
  name = escape(name);
  email = isEmail(email) ? normalizeEmail(email) : "";
  phone = escape(phone);
  notes = escape(notes);
  pickupType = "Later" ? "Later" : "Now";
  pickupDay = escape(pickupDay);
  pickupTime = escape(pickupTime);
  paymentType = "online" ? "online" : "in_store";
  if (!containsValidProducts(items)) res.status(400).send("Invalid Cart");

  try {
    let stripeCharge;
    if (paymentType === "online") {
      stripeCharge = await stripe.charges.create({
        amount: totalPrice * 100,
        currency: "usd",
        description: process.env.COMPANY_NAME,
        source: req.body.stripeTokenID
      });
    }
    const body = await rp({
      method: "POST",
      uri: "https://api.phaxio.com/v1/send",
      formData: {
        to: process.env.PHONE_NUMBER,
        string_data: ejs.render(
          fs.readFileSync(path.join(__dirname, "fax_template.ejs"), "utf-8"),
          {
            _id: id,
            name,
            phone,
            email,
            notes,
            pickupType,
            pickupDay,
            pickupTime,
            paymentType,
            items,
            totalQty,
            totalPrice
          }
        ),
        string_data_type: "html",
        api_key: process.env.PHAXIO_KEY,
        api_secret: process.env.PHAXIO_SECRET_KEY
      }
    });
    const parsedBody = JSON.parse(body);
    const faxed = parsedBody.success ? true : false;
    const faxID = parsedBody.data.faxId;
    const newOrder = await new Order({
      _id: id,
      name,
      phone,
      email,
      notes,
      pickup: {
        pickupType,
        pickupDay,
        pickupTime
      },
      paymentType,
      stripe: stripeCharge ? stripeCharge.id : "",
      fax: {
        faxed,
        faxID
      },
      items,
      totalQty,
      totalPrice
    }).save();
    res.json(newOrder);
  } catch (e) {
    console.log(e);
    res.json({
      [e.name]: e.message
    });
  }
});

module.exports = router;
