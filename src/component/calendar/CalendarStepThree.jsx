import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import moment from "moment";
import momentTZ from "moment-timezone";
import "./calendar.css";

//Bootstrap Grid
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

//Material UI
import clsx from "clsx";

//Import Other Components
import WidgetContainer from "./WidgetContainer";
import CalendarStep from "./CalendarStep";

//FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

export class CalendarStepThree extends Component {
  state = {
    dateObject: moment(),
    currentDay: null,
    showCalendarTable: true,
    showMonthTable: false,
    allmonths: moment.months(),
    showYearNav: false,
    selectedDay: null,
    selectedTimezone: null,
    timeZone: momentTZ.tz.names(),
    name: "",
    email: "",
    comment: "",
    calendarContainer: false,
    clockContainer: false
  };

  renderShowCurrentDay() {
    return this.state.dateObject.format("dddd");
  }
  renderShowCurrentMonthYear() {
    return this.state.dateObject.format("MMMM, YYYY");
  }
  renderShowCurrentDayNum() {
    return this.state.dateObject.format("Do");
  }
  renderShowCurrentHour() {
    return this.state.dateObject.format("HH:mm");
  }

  calendarContainer = e => {
    this.setState({
      calendarContainer: !this.state.calendarContainer
    });
  };

  clockContainer = e => {
    this.setState({
      clockContainer: !this.state.clockContainer
    });
  };

  render() {
    const classes = useStyles;
    const { name, email, comment } = this.state;
    const values = {
      name,
      email,
      comment
    };
    const setValues = {
      name,
      email,
      comment
    };
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };
    const formList = null;
    const { calendarContainer } = this.state;
    const { clockContainer } = this.state;

    if (this.state.clockContainer) {
      return <CalendarStep clockContainer={this.clockContainer} />;
    }

    if (this.state.calendarContainer) {
      return <WidgetContainer calendarContainer={this.calendarContainer} />;
    }

    return (
      // <section className="body-section">
      <Container maxWidth="sm">
        <div className="top-header">{this.renderShowCurrentDay()}</div>
        <div className="cover-header">
          <div className="month-year">{this.renderShowCurrentMonthYear()}</div>
          <div className="day-num">{this.renderShowCurrentDayNum()}</div>
          <Row>
            <Col xs lg="2" className="calendar-icon">
              <span
                onClick={() => {
                  this.calendarContainer();
                }}
                className="icon-click"
              >
                <FontAwesomeIcon icon="calendar-alt" />
              </span>
            </Col>
            <Col xs lg="8" className="hour-minute-range">
              {this.renderShowCurrentHour()}
            </Col>
            <Col xs lg="2" className="clock-icon">
              <span
                onClick={() => {
                  this.clockContainer();
                }}
                className="icon-click"
              >
                <FontAwesomeIcon icon="clock" />
              </span>
            </Col>
          </Row>
        </div>
        <form
          className={classes.container}
          desk-form
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Comment"
            className={classes.textField}
            value={values.comment}
            onChange={handleChange("comment")}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className="button-primary"
          >
            BOOK
          </Button>
        </form>
      </Container>
      // </section>
    );
  }
}

export default CalendarStepThree;
//name, email, comment
