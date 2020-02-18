import React, { useEffect, useState } from "react";
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
          width={10}
        />
      </BarChart>
      {/* <BarChart
        data={state.topOwners}
        layout={"vertical"}
        margin={{
          top: 15,
          right: 20,
          left: 15,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type={"number"} tick={{ fill: "black", fontSize: "10px" }} />
        <YAxis
          type={"category"}
          dataKey="num_of_orders"
          tick={{ fill: "black", fontSize: "10px" }}
        />
        <Tooltip />
        <Bar dataKey="owner_name" fill="#3d3da4" width={10} />
      </BarChart> */}
    </div>
  );
};

export default TopEmployeesChart;
