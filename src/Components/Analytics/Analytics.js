import React from "react";
import Badges from "./Badges/Badges";
import Charts from "./Charts/Charts";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  badges: {
      height: "15vh",
      // backgroundColor:"green"
  },
  charts: {
      height: "85vh",
      // backgroundColor:"green"
  }
}));

const Analytics = () => {
    const classes = useStyles();
  return (
    // <div>
    //     <Badges />
    //     <Charts />
    // </div>
    
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.badges}>
          <Badges />
          {/* <Paper style={{boxShadow: "none", backgroundColor:"green"}}>xs=12</Paper> */}
        </Grid>
        <Grid item xs={12} className={classes.charts}>
          {/* <Paper style={{boxShadow: "none"}} >xs=12</Paper> */}
          <Charts />
        </Grid>
      </Grid>
    </div>
  );
};

export default Analytics;
