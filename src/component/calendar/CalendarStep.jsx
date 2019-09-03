import React, { Component } from "react";
import moment from "moment";
import momentTZ from "moment-timezone";
import "./calendar.css";

//Material UI
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// import { range } from "moment-range";
//Import Other Components
import WidgetContainer from "./WidgetContainer";

//Bootstrap Grid
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

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
import { MenuList, MenuItem } from "@material-ui/core";

import { Scrollbars } from "react-custom-scrollbars";

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

export class CalendarStep extends Component {
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
    hourList: [
      "00:00 - 00:30",
      "00:30 - 01:00",
      "01:30 - 02:00",
      "02:30 - 03:00",
      "03:30 - 04:00",
      "04:30 - 05:00",
      "05:30 - 06:00",
      "06:30 - 07:00",
      "07:30 - 08:00",
      "08:30 - 09:00",
      "09:30 - 10:00",
      "10:30 - 11:00",
      "11:30 - 12:00",
      "12:30 - 13:00",
      "13:30 - 14:00",
      "14:30 - 15:00",
      "15:30 - 16:00",
      "16:30 - 17:00",
      "17:30 - 18:00",
      "18:30 - 19:00",
      "19:30 - 20:00",
      "20:30 - 21:00",
      "21:30 - 22:00",
      "22:30 - 23:00",
      "23:30 - 24:00"
    ],
    calendarContainer: false,
    clockContainer: false,
    shown: true,
    timeShown: true
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

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  onTimeClick = () => {
    this.setState(
      {
        displayForm: false
      },
      () => {
        this.displayForm();
      }
    );
  };

  continue = e => {
    // e.preventDefault();
    this.props.nextStep();
  };

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
    const hourList = null;
    const { calendarContainer } = this.state;

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

    var shown = {
      display: this.state.shown ? "block" : "none"
    };

    var hidden = {
      display: this.state.timeShown ? "block" : "none",
      display: this.state.shown ? "none" : "block"
    };

    var timeShown = {
      display: this.state.timeShown ? "block" : "none"
    };

    var timeHidden = {
      display: this.state.shown ? "block" : "none",
      display: this.state.timeShown ? "none" : "block"
    };

    if (this.state.calendarContainer) {
      return <WidgetContainer calendarContainer={this.calendarContainer} />;
    }
    if (this.state.clockContainer) {
      return <CalendarStep clockContainer={this.clockContainer} />;
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
        <Row className="desktop-view">
          <Col className="timezone-column" style={shown}>
            <div className="col filter-column">
              <FormControl variant="filled">
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={this.state.timeZone}
                  onChange={this.handleChange("timeZone")}
                  hintText="GMT+2 (South Africa)"
                  input={
                    <FilledInput
                      placeholder="GMT+2 (South Africa)"
                      name="timeZone"
                      id="filled-timeZone-simple"
                    />
                  }
                >
                  <MenuItem>GMT+2 (South Africa)</MenuItem>
                  {this.state.timeZone.map(data => (
                    <MenuItem key={data} className="time-list">
                      <span>{data}</span>
                      <br />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <List className="hour">
                <Scrollbars>
                  {this.state.hourList.map(data => (
                    <ListItem key={data} className="hour-row">
                      <ListItemText className="hour-item">
                        <span
                        // onClick={e => {
                        //   // this.onTimeClick(e);
                        //   this.continue();
                        // }}
                        >
                          {data}
                        </span>
                      </ListItemText>
                    </ListItem>
                  ))}
                  {/* <HourList hourList={hourList} /> */}
                </Scrollbars>
              </List>
            </div>
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row className="mobile-view mobile-time">
          <Col className="mobile-view-time" style={shown}>
            <div className="col filter-column-mobile">
              <FormControl variant="filled">
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={this.state.timeZone}
                  onChange={this.handleChange("timeZone")}
                  hintText="GMT+2 (South Africa)"
                  input={
                    <FilledInput
                      placeholder="GMT+2 (South Africa)"
                      name="timeZone"
                      id="filled-timeZone-simple"
                    />
                  }
                >
                  <MenuItem>GMT+2 (South Africa)</MenuItem>
                  {this.state.timeZone.map(data => (
                    <MenuItem key={data} className="time-list">
                      <span>{data}</span>
                      <br />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <List className="hour">
                <Scrollbars>
                  {this.state.hourList.map(data => (
                    <ListItem key={data} className="hour-row">
                      <ListItemText className="hour-item">
                        <span
                        // onClick={e => {
                        //   // this.onTimeClick(e);
                        //   this.continue();
                        // }}
                        >
                          {data}
                        </span>
                      </ListItemText>
                    </ListItem>
                  ))}
                  {/* <HourList hourList={hourList} /> */}
                </Scrollbars>
              </List>
            </div>
          </Col>
          <Col>
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
          </Col>
        </Row>
      </Container>
    );
  }
}

// const HourList = props => (
//   <div>{props.hourList}</div>
// );

CalendarStep.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CalendarStep);
