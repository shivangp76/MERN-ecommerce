import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/categoryActions";
import { fetchProducts } from "../../actions/productActions";

import CartFunctions from "../cart/CartFunctions";

class Products extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchProducts(this.props.match.params.categoryID);
  }

  chunk(arr, chunkSize = 1, cache = []) {
    const tmp = [...arr];
    if (chunkSize <= 0) return cache;
    while (tmp.length) cache.push(tmp.splice(0, chunkSize));
    return cache;
  }

  displayProducts() {
    if (this.props.products.length === 0) {
      return <Redirect to="/menu/" />;
    }
    return this.chunk(this.props.products, 3).map((c_products, i) => (
      <div className={`row`} key={i}>
        {c_products.map(product => (
          <div className={`col-md-4 p-3`} key={product._id}>
            <div className={`card mx-auto border-secondary`}>
              <div className={`card-body`}>
                <h5 className={`card-title`}>
                  {product.title}&nbsp;
                  {product.spicy ? (
                    <img
                      src={process.env.PUBLIC_URL + "/images/spicy.png"}
                      alt="Spicy Icon"
                    />
                  ) : (
                    ""
                  )}
                </h5>
                <p>{product.description}</p>
                {product.variants ? (
                  product.variants.map((variation, i) => {
                    const option = Object.keys(variation.attributes).map(
                      (key, i) => (
                        <span className={`mb-3`} key={i}>
                          {key}: {variation.attributes[key]}
                        </span>
                      )
                    );
                    return (
                      <h6 key={variation.SKU}>
                        {option} <br />
                        &#36;{variation.price.toFixed(2)}&nbsp;&nbsp;
                        <CartFunctions
                          id={product._id}
                          action="add"
                          SKU={variation.SKU}
                          message="Add to Cart"
                          type="secondary"
                        />
                        {product.variants.length - 1 !== i ? (
                          <Fragment>
                            <br />
                            <br />
                          </Fragment>
                        ) : (
                          ""
                        )}
                      </h6>
                    );
                  })
                ) : (
                  <Fragment>
                    <h6>
                      &#36;{product.price.toFixed(2)}
                      &nbsp;&nbsp;
                      <CartFunctions
                        id={product._id}
                        action="add"
                        message="Add to Cart"
                        type="secondary"
                      />
                    </h6>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  }

  render() {
    return (
      <div>
        <section className={`banner-area`}>
          <div className={`overlay`} />
          <div className={`container`}>
            <div className={`row`}>
              <div className={`col-12 mx-auto`}>
                {this.props.categories
                  .filter(c => c._id === this.props.match.params.categoryID)
                  .map(obj => (
                    <Fragment key={obj._id}>
                      <h1 className={`text-white`}>{obj.title}</h1>
                      <h4 className={`text-white`}>{obj.description}</h4>
                      <p className={`link-nav`}>
                        <Link to="/">
                          <span className={`text-white`}>Home </span>
                        </Link>
                        >>
                        <Link to="/menu/">
                          <span className={`text-white`}> Menu</span>
                        </Link>
                        >>
                        <span className={`text-white`}> {obj.title}</span>
                      </p>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </section>
        <section className={`bg-white fix-background py-3`}>
          <div className={`container`}>{this.displayProducts()}</div>
        </section>
      </div>
    );
  }
}

Products.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
  products: state.products.products
});

export default connect(
  mapStateToProps,
  { fetchCategories, fetchProducts }
)(Products);
