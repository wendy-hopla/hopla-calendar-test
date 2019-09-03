import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import moment from "moment";
import momentTZ from "moment-timezone";
import "./calendar.css";

//Import Other Components
import CalendarStep from "./CalendarStep";

//Material UI
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
//Material UI
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Scrollbars } from "react-custom-scrollbars";
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
import WidgetContainer from "./WidgetContainer";

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

class Calendar extends Component {
  weekdayshort = moment.weekdaysMin();

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
    labelWidth: 0,
    clockContainer: false,
    calendarContainer: false,
    displayForm: false,
    formContainer: null,
    shown: true,
    timeShown: true,
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
    ]
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

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable
    });
  };
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable
    });
  };
  showDay() {
    return <span>{this.currentDay}</span>;
  }
  render() {
    return (
      <div>
        <p>{this.currentDay}</p>
      </div>
    );
  }
  TimeZones = props => {
    let timeZone = [];
    props.data.map(data => {
      timeZone.push(
        <Select
          key={data}
          onChange={e => {
            this.setTimeZone(data);
          }}
        >
          <MenuList>{data}</MenuList>
        </Select>
      );
    });
  };
  MonthList = props => {
    let months = [];
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  showYearEditor = () => {
    this.setState({
      showYearNav: true,
      showCalendarTable: !this.state.showCalendarTable
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showMonthTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr)
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showMonthTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr)
    });
  };
  setYear = year => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearNav: !this.state.showYearNav
    });
  };
  onYearChange = e => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDates = moment(stopDate);
    while (currentDate <= stopDates) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = props => {
    let months = [];
    let nextten = moment()
      .set("year", props)
      .add("year", 12)
      .format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Year</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };
  onDayClick = (e, d) => {
    this.setState(
      {
        selectedDay: d
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
        // this.displayTimeSelection();
      }
    );
  };
  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };
  toggleTime() {
    this.setState({
      timeShown: !this.state.timeShown
    });
  }
  continue = e => {
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
    const { classes } = this.props;
    const { calendarContainer } = this.state;
    const { clockContainer } = this.state;

    let timeSelections = null;
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

    if (this.state.displayTimeSelection) {
      timeSelections = <CalendarStep />;
    }

    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d === this.currentDay() ? "today" : "";
      /*let selectedClass = (d == this.state.selectedDay ? " selected-day " : "") */
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={e => {
              this.onDayClick(e, d);
              // this.continue();
            }}
          >
            {d}
          </span>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        /* let insertRow = cells.slice(); */
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    if (this.state.clockContainer) {
      return <CalendarStep clockContainer={this.clockContainer} />;
    }

    if (this.state.calendarContainer) {
      return <WidgetContainer calendarContainer={this.calendarContainer} />;
    }

    return (
      // <section className="body-section">
      <Container maxWidth="sm">
        {timeSelections}
        <div className="top-header">{this.renderShowCurrentDay()}</div>
        <div className="cover-header">
          <div className="month-year">{this.renderShowCurrentMonthYear()}</div>
          <div className="day-num">{this.renderShowCurrentDayNum()}</div>
          <Row>
            <Col xs lg="2" className="calendar-icon">
              <span
                onClick={e => {
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
                onClick={e => {
                  this.clockContainer();
                }}
                className="icon-click"
              >
                <FontAwesomeIcon icon="clock" />
              </span>
            </Col>
          </Row>
        </div>
        <Row id="calendar-id" className="desktop-view cal-wrapper-trans">
          <Col className="calendar-column" style={shown}>
            <div className="tail-datetime-calendar">
              <div className="calendar-navi">
                <span
                  onClick={e => {
                    this.onPrev();
                  }}
                  className="calendar-button button-prev"
                >
                  <FontAwesomeIcon icon="caret-left" />
                </span>
                {!this.state.showMonthTable && !this.state.showYearEditor && (
                  <span
                    id="month-label"
                    className="calendar-label calendar-label-left"
                    onClick={e => {
                      this.showMonth();
                    }}
                  >
                    {this.month()},
                  </span>
                )}
                <span
                  id="year-label"
                  className="calendar-label calendar-label-right"
                  onClick={e => {
                    this.showYearEditor();
                  }}
                >
                  {this.year()}
                </span>

                <span
                  onClick={e => {
                    this.onNext();
                  }}
                  className="calendar-button button-next"
                >
                  <FontAwesomeIcon icon="caret-right" />
                </span>
              </div>
              <div className="calendar-date">
                {this.state.showYearNav && (
                  <this.YearTable props={this.year()} />
                )}
                {this.state.showMonthTable && (
                  <this.MonthList data={moment.months()} />
                )}
              </div>

              {this.state.showCalendarTable && (
                <div className="calendar-date">
                  <table className="calendar-day">
                    <thead>
                      <tr>{weekdayshortname}</tr>
                    </thead>
                    <tbody>{daysinmonth}</tbody>
                  </table>
                </div>
              )}
            </div>
          </Col>
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
                          onClick={e => {
                            //   // this.onTimeClick(e);
                            this.continue();
                          }}
                        >
                          {data}
                        </span>
                      </ListItemText>
                    </ListItem>
                  ))}
                  {/* <HourList hourList={hourList} /> */}
                </Scrollbars>
              </List>
              {/* <Button
                variant="contained"
                color="primary"
                className="button-primary"
              >
                BOOK
              </Button> */}
            </div>
          </Col>
        </Row>
        <Row className="mobile-view">
          <div className="calendar-column" style={shown}>
            <div className="tail-datetime-calendar">
              <div className="calendar-navi">
                <span
                  onClick={e => {
                    this.onPrev();
                  }}
                  className="calendar-button button-prev"
                >
                  <FontAwesomeIcon icon="caret-left" />
                </span>
                {!this.state.showMonthTable && !this.state.showYearEditor && (
                  <span
                    className="calendar-label calendar-label-left"
                    onClick={e => {
                      this.showMonth();
                    }}
                  >
                    {this.month()},
                  </span>
                )}
                <span
                  className="calendar-label calendar-label-right"
                  onClick={e => {
                    this.showYearEditor();
                  }}
                >
                  {this.year()}
                </span>

                <span
                  onClick={e => {
                    this.onNext();
                  }}
                  className="calendar-button button-next"
                >
                  <FontAwesomeIcon icon="caret-right" />
                </span>
              </div>
              <div className="calendar-date">
                {this.state.showYearNav && (
                  <this.YearTable props={this.year()} />
                )}
                {this.state.showMonthTable && (
                  <this.MonthList data={moment.months()} />
                )}
              </div>

              {this.state.showCalendarTable && (
                <div className="calendar-date">
                  <table className="calendar-day">
                    <thead>
                      <tr>{weekdayshortname}</tr>
                    </thead>
                    <tbody>{daysinmonth}</tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <div style={hidden} />
          <div className="time-column" style={timeShown}>
            {timeSelections}
          </div>
          <div style={timeHidden} />
          <Col>
            <div className="col filter-column">
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={this.state.timeZone}
                  onChange={this.handleChange("timeZone")}
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
                          onClick={e => {
                            // this.onTimeClick(e);
                            this.continue();
                          }}
                        >
                          {data}
                        </span>
                      </ListItemText>
                    </ListItem>
                  ))}
                  {/* <HourList hourList={hourList} /> */}
                </Scrollbars>
              </List>
              {/* <Button
                variant="contained"
                color="primary"
                className="button-primary"
              >
                BOOK
              </Button> */}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Calendar);
