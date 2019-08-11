import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import moment from "moment";
import momentTZ from "moment-timezone";
import "./calendar.css";

//Material UI
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { FixedSizeList } from "react-window";

// import { range } from "moment-range";
//Import Other Components
import CalendarStepThree from "./CalendarStepThree";

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

class CalendarStep extends Component {
  state = {
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
    displayForm: false,
    formContainer: null
  };

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  onTimeClick = () =>{
    this.setState(
      {
        displayForm: false
      },
      () => {
        this.displayForm();
      }
    );
  }

  displayForm = () => {
    this.setState({
      displayForm: !this.state.displayForm
    });
  }

  render() {
    const hourList = null;

    let formContainer = null;
    if(this.state.displayForm) {
      formContainer = <CalendarStepThree />;
    }

    return(
      <Col >
      {formContainer}
        <div className="col filter-column">
          <FormControl variant="filled">
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
                      this.onTimeClick(e);
                    }}
                    >{data}
                    </span>
                  </ListItemText>
                </ListItem>
              ))}
              {/* <HourList hourList={hourList} /> */}
            </Scrollbars>
          </List>
          <Button
            variant="contained"
            color="primary"
            className="button-primary"
          >
            BOOK
          </Button>
        </div>
      </Col>
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
