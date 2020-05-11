import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    const locations = {
      "/": 0,
      "/clients": 1,
      "/actions": 2,
      "/analytics": 3
    }

    const currentLocation = props.history.location.pathname
    const value = locations[currentLocation]
    setValue(value)
  }, [])
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label="Home"
            {...a11yProps(0)}
            onClick={() => props.history.push("/")}
          />
          <Tab
            label="Clients"
            {...a11yProps(0)}
            onClick={() => props.history.push("/clients")}
          />
          <Tab
            label="Actions"
            {...a11yProps(1)}
            onClick={() => props.history.push("/actions")}
          />
          <Tab
            label="Analytics"
            {...a11yProps(2)}
            onClick={() => props.history.push("/analytics")}
          />
        </Tabs>
      </AppBar>
    </div>
  );
}

/*
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Link to="/clients"><Tab label="Clients" {...a11yProps(0)} /></Link>
          <Link to="/actions"><Tab label="Actions" {...a11yProps(1)} /></Link>
          <Link to="/analytics"><Tab label="Analytics" {...a11yProps(2)} /></Link>
        </Tabs>
      </AppBar>
    </div>
*/
export default withRouter(SimpleTabs);
