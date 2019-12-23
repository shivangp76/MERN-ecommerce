import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { modifyCart } from "../../actions/cartActions";

class CartFunctions extends Component {
  handleClick(e) {
    e.preventDefault();
    this.btn.setAttribute("disabled", "disabled");
    this.props.SKU
      ? this.props.modifyCart(this.props.id, this.props.action, this.props.SKU)
      : this.props.modifyCart(this.props.id, this.props.action);

    if (this.btn) {
      this.btn.removeAttribute("disabled");
    }
  }

  render() {
    const { margins, type, message } = this.props;
    if (margins === "true") {
      return (
        <button
          ref={btn => {
            this.btn = btn;
          }}
          onClick={e => this.handleClick(e)}
          className={`${type}-btn cart-func`}
          style={{ margin: "0 0 1rem 0" }}
        >
          {message}
        </button>
      );
    } else {
      return (
        <button
          ref={btn => {
            this.btn = btn;
          }}
          className={`${type}-btn cart-func`}
          onClick={e => this.handleClick(e)}
        >
          {message}
        </button>
      );
    }
  }
}

CartFunctions.propTypes = {
  modifyCart: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  SKU: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default connect(
  null,
  { modifyCart }
)(CartFunctions);
