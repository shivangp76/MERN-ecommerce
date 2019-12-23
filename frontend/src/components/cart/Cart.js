import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCart } from "../../actions/cartActions";
import CartFunctions from "./CartFunctions";

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
    return (
      <div>
        <section className={`banner-area`}>
          <div className={`overlay`} />
          <div className={`container`}>
            <div className={`row`}>
              <div className={`col-12 mx-auto`}>
                <h1 className={`text-white`}>Cart</h1>
                <p className={`link-nav`}>
                  <Link to="/">
                    <span className={`text-white`}>Home </span>
                  </Link>
                  >>
                  <span className={`text-white`}> Cart</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={`bg-white fix-background pb-4`}>
          <div className={`container`}>
            <div className={`row pt-4`}>
              <div className="col-sm">
                <p className={`lead`}>Item</p>
              </div>
              <div className="col-sm-1">
                <p className={`lead`}>Quantity</p>
              </div>
              <div className="col-sm">
                <p className={`lead`}>Price</p>
              </div>
            </div>
            {this.props.items.map(product =>
              product.attributes ? (
                <div className={`row py-2`} key={product.SKU}>
                  <div className="col-sm">
                    <h3 className={`mb-20`}>{product.title}</h3>
                    <br />
                    <p className={`lead`}>
                      {Object.keys(product.attributes).map((key, i) => (
                        <span key={i}>
                          {key}: {product.attributes[key]}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="col-sm-1">
                    <h6>{product.qty}</h6>
                  </div>
                  <div className="col-sm">
                    <h6>
                      &#36;{product.price.toFixed(2)}&nbsp;&nbsp;&nbsp;
                      <CartFunctions
                        action="add"
                        id={product._id}
                        SKU={product.SKU}
                        message="Add 1"
                        type="secondary"
                        margins="true"
                      />
                      &nbsp;&nbsp;
                      <CartFunctions
                        action="reduce"
                        id={product._id}
                        SKU={product.SKU}
                        message="Remove 1"
                        type="secondary"
                        margins="true"
                      />
                      &nbsp;&nbsp;
                      <CartFunctions
                        action="remove"
                        id={product._id}
                        SKU={product.SKU}
                        message="Remove all"
                        type="secondary"
                        margins="true"
                      />
                    </h6>
                  </div>
                </div>
              ) : (
                <div className={`row py-2`} key={product._id}>
                  <div className="col-sm">
                    <h3 className={`mb-20`}>{product.title}</h3>
                  </div>
                  <div className="col-sm-1">
                    <h6>{product.qty}</h6>
                  </div>
                  <div className="col-sm">
                    <h6>
                      &#36;{product.price.toFixed(2)}&nbsp;&nbsp;&nbsp;
                      <CartFunctions
                        action="add"
                        id={product._id}
                        message="Add 1"
                        type="secondary"
                        margins="true"
                      />
                      &nbsp;&nbsp;
                      <CartFunctions
                        action="reduce"
                        id={product._id}
                        message="Remove 1"
                        type="secondary"
                        margins="true"
                      />
                      &nbsp;&nbsp;
                      <CartFunctions
                        action="remove"
                        id={product._id}
                        message="Remove all"
                        type="secondary"
                        margins="true"
                      />
                    </h6>
                  </div>
                </div>
              )
            )}
            <div className="row pt-4">
              <div className="col">
                <h4>Total Quantity: {this.props.totalQty}</h4>
                <br />
                <h4>Total Price: &#36;{this.props.totalPrice.toFixed(2)}</h4>
                <p>Including Tax</p>
                {this.props.items.length > 0 ? (
                  <Link to="/checkout/">
                    <button className={`primary-btn`}>
                      Proceed to Checkout
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Cart.propTypes = {
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
  mapStateToProps,
  { fetchCart }
)(Cart);
