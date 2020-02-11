import React, { useEffect, useState, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const TopEmployeesChart = () => {
  const [state, setState] = useState({
    topOwners: []
  });

  useEffect(() => {
    axios.get("http://localhost:4000/salesBy").then(response => {
      console.log("In componentDidMount of BarChart. response is ", response);
      const { salesByOwners } = response.data;
      const topOwners = salesByOwners.splice(0, 3);
      setState({ ...state, topOwners });
    });
  }, []);

  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
        style={{ position: "relative", right: "12vw" }}
      >
        Top Employees
      </Typography>

      {/* <BarChart width={500} height={300} data={state.topOwners} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey="owner_name"/>
        <XAxis  />
        <Tooltip />
        <Legend />
        <Bar dataKey="num_of_orders" fill="#8884d8"  />
      </BarChart> */}
      <BarChart
        width={500}
        height={250}
        data={state.topOwners}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="owner_name" />
        <YAxis />
        <Tooltip offset={0} label="false" />
        <Legend />
        <Bar
          dataKey="num_of_orders"
          fill="#3d3da4"
          layout="horizontal"
          isAnimationActive={true}
        />
      </BarChart>
    </div>
  );
};

export default TopEmployeesChart;
