import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import "./calendar.css";

//Import Other Components
import CalendarStep from "./CalendarStep";
import CalendarStepThree from "./CalendarStepThree";
import Calendar from "./Calendar";

//FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarAlt,
  faClock,
  faCaretLeft,
  faCaretRight
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCalendarAlt, faClock, faCaretLeft, faCaretRight);

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    width: "100%",
    margin: theme.spacing.unit,
    minWidth: 320
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

export class WidgetContainer extends Component {
  state = {
    step: 1,
    calendarContainer: false,
    clockContainer: false
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  displayCalendars = () => {
    this.setState({
      calendarContainer: !this.state.calendarContainer
    });
  };

  displayClocks = () => {
    this.setState({
      clockContainer: !this.state.clockContainer
    });
  };

  render() {
    const { step } = this.state;
    const { calendarContainer } = this.state;
    const { clockContainer } = this.state;

    switch (step) {
      case 1:
        return <Calendar nextStep={this.nextStep} />;
      case 2:
        return <CalendarStep nextStep={this.nextStep} />;
      case 3:
        return <CalendarStepThree />;
    }

    switch (calendarContainer) {
      case 1:
        return <Calendar displayCalendars={this.displayCalendars} />;
      case 2:
        return;
    }

    switch (clockContainer) {
      case 1:
        return <CalendarStep displayClocks={this.displayClocks} />;
      case 2:
        return;
    }
  }
}

export default WidgetContainer;
