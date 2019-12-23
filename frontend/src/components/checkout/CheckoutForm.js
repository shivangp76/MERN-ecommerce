import React, {
  Component
} from "react";
import PropTypes from "prop-types";
import {
  connect
} from "react-redux";
import {
  CardElement,
  injectStripe
} from "react-stripe-elements";
import {
  Link,
  Redirect
} from "react-router-dom";

import {
  fetchCart
} from "../../actions/cartActions";
import {
  newOrder
} from "../../actions/orderActions";

import PickupTimeDropdown from "./PickupTimeDropdown";

import moment from "moment";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      notes: "",
      pickupType: "Now",
      pickupDay: "",
      pickupTime: "",
      paymentType: "in_store",
      message: "",
      isStripeValid: false,
      orderStatus: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStripeChange = this.handleStripeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(category, value) {
    this.setState({
      [category]: value
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleStripeChange(e) {
    if (e.errors) {
      this.setState({
        isStripeValid: false,
        message: "Please check your credit card information and try again."
      });
    } else if (e.complete === true) {
      this.setState({
        isStripeValid: true,
        message: ""
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.btn.setAttribute("disabled", "disabled");
    if (this.state.pickupType === "Now") {
      this.setState({
        pickupDay: "",
        pickupTime: ""
      });
    }
    const {
      name,
      phone,
      email,
      notes,
      pickupType,
      pickupDay,
      pickupTime,
      paymentType,
      isStripeValid
    } = this.state;
    const {
      items,
      totalQty,
      totalPrice
    } = this.props;

    const eleven = moment("12-25-2995 11:00 am", "MM-DD-YYYY h:mm a");
    const three = moment("12-25-2995 3:00 pm", "MM-DD-YYYY h:mm a");
    const pickupTimeParsed = moment(
      "12-25-2995 " + pickupTime,
      "MM-DD-YYYY h:mm a"
    );
    const pickupNowParsed = moment(
      "12-25-2995 " + moment().format("h:mm a"),
      "MM-DD-YYYY h:mm a"
    );
    if (
      this.props.containsLunchItem &&
      ((pickupType === "Now" &&
          pickupNowParsed.isBefore(eleven) &&
          pickupNowParsed.isAfter(three)) ||
        (pickupType === "Later" &&
          pickupTimeParsed.isBefore(eleven) &&
          pickupTimeParsed.isAfter(three)))
    ) {
      this.setState({
        message: "Lunch items are only available from 11am to 3pm. Please pick a different time."
      });
    } else if (paymentType === "online") {
      if (!isStripeValid) {
        this.setState({
          message: "Please check your credit card information and try again."
        });
      } else {
        this.props.stripe
          .createToken({
            name
          })
          .then(({
            token
          }) => {
            this.props.newOrder({
              name,
              phone,
              email,
              notes,
              pickupType,
              pickupDay,
              pickupTime,
              paymentType,
              stripeTokenID: token.id,
              items,
              totalQty,
              totalPrice
            });
          })
          .then(() => {
            this.setState({
              orderCompleted: 1
            });
          })
          .catch(e => {
            this.setState({
              orderCompleted: 2
            });
          });
      }
    } else {
      var orderPromise = new Promise((res, rej) => {
        this.props.newOrder({
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
        });
        setTimeout(() => {
          res();
        }, 500);
      });
      orderPromise
        .then(() => {
          this.setState({
            orderCompleted: 1
          });
        })
        .catch(e => {
          this.setState({
            orderCompleted: 2
          });
        });
    }
    if (this.btn) {
      this.btn.removeAttribute("disabled");
    }
  }

  render() {
    if (this.state.orderCompleted === 1) {
      return ( <
        Redirect to = {
          {
            pathname: "/thank-you/",
            state: {
              orderCompleted: 1
            }
          }
        }
        />
      );
    } else if (this.state.orderCompleted === 2) {
      return ( <
        Redirect to = {
          {
            pathname: "/error/",
            state: {
              title: "Sorry your order could not be completed.",
              message: "Please try again later."
            }
          }
        }
        />
      );
    }
    return ( <
      div >
      <
      section className = {
        `banner-area`
      } >
      <
      div className = {
        `overlay`
      }
      /> <
      div className = {
        `container`
      } >
      <
      div className = {
        `row`
      } >
      <
      div className = {
        `col-12 mx-auto`
      } >
      <
      h1 className = {
        `text-white`
      } > Checkout < /h1> <
      p className = {
        `link-nav`
      } >
      <
      Link to = "/" >
      <
      span className = {
        `text-white`
      } > Home < /span> <
      /Link> >>
      <
      span className = {
        `text-white`
      } > Checkout < /span> <
      /p> <
      /div> <
      /div> <
      /div> <
      /section> <
      section className = {
        `bg-white fix-background pb-4`
      } >
      <
      div className = {
        `container pt-3`
      } >
      <
      h4 className = {
        `py-2`
      } > Total Quantity: {
        this.props.totalQty
      } < /h4> <
      h4 className = {
        `py-2`
      } >
      Total Price: & #36;{this.props.totalPrice.toFixed(2)}
            </h4>
            <form onSubmit= {
        this.handleSubmit
      } >
      <
      div className = "row" >
      <
      div className = "col-sm-4 py-2" >
      <
      input type = "text"
      name = "name"
      className = {
        `form-control border-secondary`
      }
      placeholder = "Name on Card"
      pattern = ".{5,50}"
      required title = "5 to 50 characters"
      value = {
        this.state.name
      }
      onChange = {
        this.handleChange
      }
      /> <
      /div> <
      div className = "col-sm-4 py-2" >
      <
      input type = "text"
      name = "phone"
      className = {
        `form-control border-secondary`
      }
      placeholder = "Phone Number"
      pattern = ".{10,}"
      required title = "10 characters minimum"
      value = {
        this.state.phone
      }
      onChange = {
        this.handleChange
      }
      /> <
      /div> <
      div className = "col-sm-4 py-2" >
      <
      input type = "email"
      name = "email"
      className = {
        `form-control border-secondary`
      }
      placeholder = "Email Address"
      required value = {
        this.state.email
      }
      onChange = {
        this.handleChange
      }
      /> <
      /div> <
      /div> <
      br / >
      <
      div className = "row" >
      <
      div className = "col-sm-12" >
      <
      textarea name = "notes"
      placeholder = "Notes (Do you want your food to be spicy?)"
      className = {
        `form-control border-secondary`
      }
      rows = "4"
      cols = "50"
      maxLength = "300"
      value = {
        this.state.notes
      }
      onChange = {
        this.handleChange
      }
      /> <
      /div> <
      /div> <
      br / >
      <
      div className = "row" >
      <
      div className = "col-sm-4 py-3" >
      <
      h4 className = {
        `pb-2`
      } > Pickup Type < /h4> <
      h5 >
      <
      input type = "radio"
      name = "pickupType"
      value = "Now"
      required checked = {
        this.state.pickupType === "Now"
      }
      onChange = {
        this.handleChange
      }
      />{" "}
      Now <
      /h5> <
      h5 >
      <
      input type = "radio"
      name = "pickupType"
      value = "Later"
      checked = {
        this.state.pickupType === "Later"
      }
      onChange = {
        this.handleChange
      }
      />{" "}
      Later <
      /h5> <
      PickupTimeDropdown onDropdownChange = {
        this.handleDropdownChange
      }
      day = {
        this.state.pickupDay
      }
      time = {
        this.state.pickupTime
      }
      pickupType = {
        this.state.pickupType
      }
      /> <
      /div> <
      div className = "col-sm-4 py-3" >
      <
      h4 className = {
        `pb-2`
      } > Pay < /h4> <
      h5 >
      <
      input type = "radio"
      name = "paymentType"
      value = "in_store"
      required checked = {
        this.state.paymentType === "in_store"
      }
      onChange = {
        this.handleChange
      }
      />{" "}
      At BUSINESS_NAME <
      /h5> <
      h5 >
      <
      input type = "radio"
      name = "paymentType"
      value = "online"
      checked = {
        this.state.paymentType === "online"
      }
      onChange = {
        this.handleChange
      }
      />{" "}
      Online <
      /h5> {
        this.state.paymentType === "online" ? ( <
          div className = {
            `checkout py-3`
          } >
          <
          CardElement onChange = {
            this.handleStripeChange
          }
          /> <
          /div>
        ) : (
          ""
        )
      } <
      /div> <
      /div> <
      button ref = {
        btn => {
          this.btn = btn;
        }
      }
      className = {
        `primary-btn my-4`
      }
      type = "submit" >
      Submit <
      /button> <
      /form> <
      h5 className = {
        `text-danger`
      } > {
        this.state.message
      } < /h5> <
      /div> <
      /section> <
      /div>
    );
  }
}

CheckoutForm.propTypes = {
  fetchCart: PropTypes.func.isRequired,
  newOrder: PropTypes.func.isRequired,
  order: PropTypes.object,
  items: PropTypes.array.isRequired,
  containsLunchItem: PropTypes.bool.isRequired,
  totalQty: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  order: state.orders.order,
  items: state.cart.items,
  containsLunchItem: state.cart.containsLunchItem,
  totalQty: state.cart.totalQty,
  totalPrice: state.cart.totalPrice
});

export default injectStripe(
  connect(
    mapStateToProps, {
      fetchCart,
      newOrder
    }
  )(CheckoutForm)
);