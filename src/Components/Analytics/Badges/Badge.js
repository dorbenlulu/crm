import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faChartLine,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const Badge = (props) => {
  const classes = useStyles();
  const {icon, numValue, text, color} = props
  const iconColor = color ? color : "#bfbfbf"
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item className={classes.paper} xs={4}>
          <FontAwesomeIcon
            icon={icon}
            style={{ marginTop: "23%", fontSize: "2.5rem", color: iconColor }}
          />
        </Grid>
        <Grid item xs={8} style={{ width: "100%" }}>
          <Grid item style={{textAlign: "left", fontSize: "3vw"}}>{numValue}</Grid>
          <Grid item style={{textAlign: "left"}}>{text}</Grid>
        </Grid>
      </Grid>
    </div>
  );
};


{/* <div className={classes.root}>
<Grid container spacing={1}>
  <Grid item className={classes.paper} xs={4}>
    
    <FontAwesomeIcon
      icon={faChartLine}
      style={{ marginTop: "23%", fontSize: "2.5rem" }}
    />
  </Grid>
  <Grid item xs={8} style={{ width: "100%" }}>
    
    <Grid item style={{textAlign: "left", fontSize: "4vw"}}>14</Grid>
    <Grid item style={{textAlign: "left"}}>Lorem ipsum durom</Grid>
  </Grid>
</Grid>
</div> */}
export default Badge;
