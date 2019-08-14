import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import moment from "moment";
import momentTZ from "moment-timezone";
import "./calendar.css";

//Import Other Components
import CalendarStep from "./CalendarStep";
import CalendarStepThree from "./CalendarStepThree";
import Calendar from "./Calendar";

//Material UI
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";

//Bootstrap Grid
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

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
import { MenuList, MenuItem } from "@material-ui/core";

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

export class WidgetContainer extends Component{
    state = {
        step: 1
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
          step: step + 1
        });
      }
    
    prevStep = () => {
    const { step } = this.state;
    this.setState({
        step: step - 1
    });
    }

    render () {
        const { step } = this.state;
        

        switch(step){
            case 1: 
            return (
                <Calendar
                    nextStep={this.nextStep}
                />
            )
            case 2: 
            return (
                <CalendarStep
                    nextStep={this.nextStep}
                />
            )
            case 3:
            return (
                <CalendarStepThree
                />
            )
        } 
    }
}

export default WidgetContainer