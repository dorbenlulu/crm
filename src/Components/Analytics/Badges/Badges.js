import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import StoreContext, { ClientStoreContext } from "../../../Helpers/storeProvider";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faChartLine, faEnvelope, faUser, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import Badge from './Badge'
const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    height: "10vh",
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

const Badges = observer(() => {
  const clients = useContext(StoreContext);
  const ClientStore = useContext(ClientStoreContext);
  const classes = useStyles();
  const [state, setState] = useState({
    numOfEmailSent: 0,
    numOfOutstandingClients: 0,
    hottestCountry: ""
  });

  useEffect(async () => {
    const response = await axios.get("http://localhost:4000/allClients");
    console.log("in componentDidMount: in first then. response is ", response);
    let numOfEmailSent = 0,
      numOfOutstandingClients = 0,
      hottestCountry = "";

    const data = response.data;
    console.log("data is ", data);

    const tempClients = [];
    data.forEach(client => tempClients.push(new ClientStore(client)));
    clients.list = tempClients;

    const countriesObj = {};

    clients.list.forEach(client => {
      if (client.emailType != "null") {
        numOfEmailSent++;
      }
      if (client.sold === 0) {
        numOfOutstandingClients++;
      }
      if (countriesObj[client.country] !== undefined) {
        countriesObj[client.country] += 1;
      } else {
        countriesObj[client.country] = 0;
      }
    });
    console.log("countries object is ", countriesObj);
    let maxVal = 0;

    Object.keys(countriesObj).forEach(country => {
      if (countriesObj[country] > maxVal) {
        maxVal = countriesObj[country];
        hottestCountry = country;
      }
    });
    console.log(data.length);
    setState({ numOfEmailSent, numOfOutstandingClients, hottestCountry });
  }, []);


  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            {/* <FontAwesomeIcon icon={faChartLine} /> */}
            <Badge icon={faChartLine} numValue={""} text={""} color={"#249999"}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Badge icon={faEnvelope} numValue={state.numOfEmailSent} text={"Email Sent"} color={"#4a86f0"}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Badge icon={faUser} numValue={state.numOfOutstandingClients} text={"Outstanding Clients"} color={"#e16f84"}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Badge icon={faGlobeAmericas} numValue={state.hottestCountry} text={"Hottest Country"} color={"#b5b5e8"}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
});

export default Badges;
