import React, { Component } from "react";
import moment from "moment";

class PickupTimeDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (
      e.target.name === "pickupDay" &&
      e.target.value === "Today" &&
      this.props.day !== "" &&
      this.props.time !== ""
    ) {
      this.props.onDropdownChange("pickupTime", "");
    }
    this.props.onDropdownChange(e.target.name, e.target.value);
  }

  dayDropdownOptions() {
    var options = [];
    for (let i = 0; i < 5; i++) {
      var date = moment()
        .add(i, "days")
        .format("dddd MMM Do");
      if (date.includes("Tuesday")) continue;
      if (
        i === 0 &&
        moment().isBefore(
          moment()
            .hour(22)
            .minute(0)
            .second(0)
        )
      ) {
        options.push(
          <option key="Today" value="Today">
            Today
          </option>
        );
        continue;
      }
      options.push(
        <option key={date} value={date}>
          {date}
        </option>
      );
    }
    return options;
  }

  timeDropdownOptions() {
    var options = [];
    var rightNow = moment().add(15 - (moment().minute() % 15), "minutes");
    var eleven = moment()
      .hour(11)
      .minute(0)
      .second(0);
    var i = 3;
    while (true) {
      var time =
        eleven.isBefore(rightNow) && this.props.day === "Today"
          ? moment()
              .add(15 - (moment().minute() % 15), "minutes")
              .add(i * 15, "minutes")
              .format("h:mm a")
          : moment()
              .hour(11)
              .minute(0)
              .second(0)
              .add(i * 15, "minutes")
              .format("h:mm a");
      options.push(
        <option key={time} value={time}>
          {time}
        </option>
      );
      if (time === "9:45 pm") break;
      i++;
    }
    return options;
  }

  render() {
    if (this.props.pickupType === "Now") return null;
    return (
      <div>
        <br />
        <select
          required
          name="pickupDay"
          className={`form-control`}
          value={this.props.day}
          onChange={this.handleChange}
        >
          <option disabled value="">
            ---Select Day---
          </option>
          {this.dayDropdownOptions()}
        </select>
        <br />
        <select
          required
          name="pickupTime"
          className={`form-control`}
          value={this.props.time}
          onChange={this.handleChange}
        >
          <option disabled value="">
            ---Select Time---
          </option>
          {this.timeDropdownOptions()}
        </select>
      </div>
    );
  }
}

export default PickupTimeDropdown;
