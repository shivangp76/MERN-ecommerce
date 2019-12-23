const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const helmet = require("helmet");

const products = require("./routes/api/products");
const categories = require("./routes/api/categories");
const cart = require("./routes/api/cart");
const order = require("./routes/api/orders");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.use(
    session({
      secret: process.env.SESSION_SECRET_PROD,
      name: process.env.COMPANY_NAME,
      // cookie: {
      //   // secure: true,
      //   httpOnly: true,
      //   // domain: "example.com",
      //   maxAge: 60000
      // },
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        url: process.env.MONGO_URI,
        touchAfter: 24 * 3600
      })
    })
  );
} else {
  app.use(
    session({
      secret: process.env.SESSION_SECRET_DEV,
      cookie: {
        // secure: true,
        httpOnly: true,
        // domain: "example.com",
        maxAge: 60000
      },
      resave: true,
      saveUninitialized: true
    })
  );
}

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(e => console.log(e));

app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/cart", cart);
app.use("/api/orders", order);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
