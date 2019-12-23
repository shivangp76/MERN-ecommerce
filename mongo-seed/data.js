const mongoose = require("mongoose");

const Product = require("./models/Product");
const Category = require("./models/Category");

// DB Config and Connect to Mongo
mongoose
  .connect("mongodb://mongodb/BUSINESS_NAME", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(e => {
    throw new Error(e);
  });

// FIND: "category([0-9]{2})ID"
// REPLACE: category$1ID

const category1ID = mongoose.Types.ObjectId();
const category2ID = mongoose.Types.ObjectId();
const category3ID = mongoose.Types.ObjectId();
const category4ID = mongoose.Types.ObjectId();
const category5ID = mongoose.Types.ObjectId();
const category6ID = mongoose.Types.ObjectId();
const category7ID = mongoose.Types.ObjectId();
const category8ID = mongoose.Types.ObjectId();
const category9ID = mongoose.Types.ObjectId();
const category10ID = mongoose.Types.ObjectId();
const category11ID = mongoose.Types.ObjectId();
const category12ID = mongoose.Types.ObjectId();
const category13ID = mongoose.Types.ObjectId();
const category14ID = mongoose.Types.ObjectId();
const category15ID = mongoose.Types.ObjectId();
const category16ID = mongoose.Types.ObjectId();
const category17ID = mongoose.Types.ObjectId();
const category18ID = mongoose.Types.ObjectId();
const category19ID = mongoose.Types.ObjectId();
const category20ID = mongoose.Types.ObjectId();
const category21ID = mongoose.Types.ObjectId();
const category22ID = mongoose.Types.ObjectId();

const categories = [
  new Category({
    _id: category1ID,
    title: "Appetizers",
    shortTitle: "appetizers",
    description: "",
    image: "appetizers.jpg",
    order: 1
  })
];

// ==========================================

const products = [
  new Product({
    title: "PRODUCT_NAME1",
    description: "",
    price: "1.35",
    categoryID: category1ID
  }),
  new Product({
    title: "PRODUCT_NAME1",
    description: "",
    categoryID: category5ID,
    variants: [{
        SKU: mongoose.Types.ObjectId(),
        price: "4.65",
        attributes: {
          Size: "Pint"
        }
      },
      {
        SKU: mongoose.Types.ObjectId(),
        price: "7.5",
        attributes: {
          Size: "Quart"
        }
      }
    ]
  })
];

Category.insertMany(categories)
  // .then(docs => console.log(docs))
  .catch(e => console.log(e));

Product.insertMany(products)
  // .then(docs => console.log(docs))
  .then(() => {
    mongoose.disconnect();
    console.log("Mongoose Disconnected");
  })
  .catch(e => console.log(e));