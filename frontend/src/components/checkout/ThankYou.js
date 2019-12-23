import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class ThankYou extends Component {
  render() {
    try {
      const { orderCompleted } = this.props.location.state;
      if (orderCompleted === 1) {
        return (
          <div>
            <section className={`banner-area`}>
              <div className={`overlay`} />
              <div className={`container mb-5`}>
                <div className={`row mb-5`}>
                  <div className={`col-12 mb-5 mx-auto`}>
                    <h1 className={`text-white`}>Thank you for your order!</h1>
                  </div>
                </div>
              </div>
            </section>
            <section className={`bg-white fix-background pb-5`}>
              <div className={`container pt-5 pb-3`}>
                <h4>
                  Please say your name at the counter to pick up your order.
                </h4>
              </div>
            </section>
          </div>
        );
      }
    } catch (e) {
      return <Redirect to="/menu/" />;
    }
  }
}

export default ThankYou;
