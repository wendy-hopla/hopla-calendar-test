import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import "./calendar.css";

//Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { FixedSizeList } from 'react-window';

// import { range } from "moment-range";

//Bootstrap Grid
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

//FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCalendarAlt, faClock, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { MenuList, MenuItem } from '@material-ui/core';

import { Scrollbars } from 'react-custom-scrollbars';

library.add(fab, faCalendarAlt, faClock, faCaretLeft, faCaretRight)

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%',
    margin: theme.spacing.unit,
    minWidth: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


const CalendarStep = ( props ) => {
    return (
     <Col>
     <div className="col filter-column">
     <FormControl variant="filled">
     <InputLabel>Timezone</InputLabel>
       {/* <Select value={this.state.timeZone} onChange={this.handleChange('timeZone')} input={<FilledInput placeholder="GMT+2 (South Africa)" name="timeZone" id="filled-timeZone-simple"/>}>
         <MenuItem>GMT+2 (South Africa)</MenuItem>
         {this.state.timeZone.map(data => <MenuItem key={data} className="time-list"><span>{data}</span><br/></MenuItem>)}
       </Select> */}
     </FormControl>
     <List className="hour">
     <Scrollbars>
       {/* {this.state.hourList.map(data => <ListItem key={data} className="hour-row"><ListItemText className="hour-item">{data}</ListItemText><br/></ListItem>)} */}
       <ListItem key={props.hourList} className="row"><ListItemText>{props.hourList}</ListItemText></ListItem>
     </Scrollbars>
     </List>
     <Button variant="contained" color="primary" className="button-primary">
       BOOK
     </Button>
     </div>
     </Col>
    )
   };
   

   CalendarStep.propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
  };

export default  withStyles(styles) (CalendarStep);