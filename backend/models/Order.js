const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 350
  },
  pickup: {
    pickupType: {
      type: String,
      required: true
    },
    pickupDay: {
      type: String
    },
    pickupTime: {
      type: String
    }
  },
  paymentType: {
    type: String,
    required: true
  },
  stripe: {
    type: String
  },
  fax: {
    faxed: {
      type: Boolean,
      required: true
    },
    faxID: {
      type: Number
    }
  },
  items: {
    type: Array,
    required: true
  },
  totalQty: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
