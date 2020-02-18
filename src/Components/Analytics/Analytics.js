import React from "react";
import Badges from "./Badges/Badges";
import Charts from "./Charts/Charts";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  badges: {
    height: "15vh"
  },
  charts: {
    height: "85vh"
  }
}));

const Analytics = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.badges}>
          <Badges />
        </Grid>
        <Grid item xs={12} className={classes.charts}>
          <Charts />
        </Grid>
      </Grid>
    </div>
  );
};

export default Analytics;
