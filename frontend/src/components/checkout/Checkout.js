import React, {
  Component
} from "react";
import {
  Redirect
} from "react-router-dom";
import PropTypes from "prop-types";
import {
  connect
} from "react-redux";
import {
  Elements,
  StripeProvider
} from "react-stripe-elements";

import CheckoutForm from "./CheckoutForm";
import {
  fetchCart
} from "../../actions/cartActions";

class Checkout extends Component {
  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
    if (this.props.items.length > 0) {
      return ( <
        StripeProvider apiKey = "STRIPE_KEY" >
        <
        Elements >
        <
        CheckoutForm / >
        <
        /Elements> <
        /StripeProvider>
      );
    } else {
      return <Redirect to = "/menu/" / > ;
    }
  }
}

Checkout.propTypes = {
  fetchCart: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  totalQty: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  items: state.cart.items,
  totalQty: state.cart.totalQty,
  totalPrice: state.cart.totalPrice
});

export default connect(
  mapStateToProps, {
    fetchCart
  }
)(Checkout);