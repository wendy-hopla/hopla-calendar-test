import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import "./calendar.css";

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));

export default function CalendarStepThree(){
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        email:'',
        comment: ''
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });   
    };
    const formList = null;

    return(
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-name"
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="outlined-name"
                label="Email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="outlined-name"
                label="Comment"
                className={classes.textField}
                value={values.comment}
                onChange={handleChange('comment')}
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
    );
}


//name, email, comment 