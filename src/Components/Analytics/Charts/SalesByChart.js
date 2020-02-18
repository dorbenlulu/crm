import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";

const SalesByChart = () => {
  const [state, setState] = useState({
    choice: "salesByCountries",
    salesByOwners: [],
    salesByCountries: [],
    salesByEmailType: []
  });

  useEffect(() => {
    axios.get("http://localhost:4000/salesBy").then(response => {
      console.log(
        "In componentDidMount of SalesByChart. response is ",
        response
      );
      const { salesByOwners, salesByCountries, salesByEmailType } = response.data;
      setState({ ...state, salesByOwners, salesByCountries, salesByEmailType });
    });
  }, []);

  const handleChange = event => {
    setState({ ...state, choice: event.target.value });
  };

  const ownersKey = state.salesByOwners[0] ? Object.keys(state.salesByOwners[0])[0] : "0";
  const countryKey = state.salesByCountries[0] ? Object.keys(state.salesByCountries[0])[0] : "0";
  const emailTypeKey = state.salesByEmailType[0] ? Object.keys(state.salesByEmailType[0])[0] : "0";

  const dataKeys = {
    salesByOwners: ownersKey,
    salesByCountries: countryKey,
    salesByEmailType: emailTypeKey
  };

  console.log("dataKeys is ", dataKeys);
  return (
    <div>
      <FormControl style={{ position: "relative", right: "38vw" }}>
        <InputLabel id="demo-simple-select-label" style={{ width: "7vw" }}>
          Sales By{" "}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ width: "9vw" }}
          value={state.choice}
          onChange={handleChange}
        >
          <MenuItem value={"salesByOwners"}>Owner</MenuItem>
          <MenuItem value={"salesByCountries"}>Country</MenuItem>
          <MenuItem value={"salesByEmailType"}>Email Type</MenuItem>
        </Select>
      </FormControl>
      <BarChart
        width={1000}
        height={300}
        data={state[state.choice]}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeys[state.choice]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="num_of_orders" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default SalesByChart;
