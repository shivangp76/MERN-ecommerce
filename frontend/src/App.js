import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Index from "./components/home/Home";
import Menu from "./components/menu/Menu";
import Products from "./components/menu/Products";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import ThankYou from "./components/checkout/ThankYou";
import Footer from "./components/layout/Footer";
import AboutUs from "./components/about-us/AboutUs";
import Error from "./components/Error";

import "./App.scss";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/about-us/" exact component={AboutUs} />
              <Route path="/menu/" exact component={Menu} />
              <Route path="/menu/:categoryID" component={Products} />
              <Route path="/cart/" exact component={Cart} />
              <Route path="/checkout/" exact component={Checkout} />
              <Route path="/thank-you/" exact component={ThankYou} />
              <Route component={Error} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
