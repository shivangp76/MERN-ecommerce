const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductVariantSchema = new Schema(
  {
    SKU: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    attributes: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  {
    _id: false
  }
);

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  spicy: {
    type: Boolean
  },
  variants: {
    type: [ProductVariantSchema],
    default: undefined
  }
});

module.exports = mongoose.model("Product", ProductSchema);
