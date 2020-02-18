import React from "react";
import TopEmployeesChart from "./TopEmployeesChart";
import SalesByChart from "./SalesByChart";
import ClientAquisitionChart from "./ClientAquisitionChart";
import Grid from "@material-ui/core/Grid";
// import { ResponsiveContainer } from "recharts";
// import BarChart from './BarChart'

const Charts = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid xs={6}>
          <Grid item><TopEmployeesChart /></Grid>
        </Grid>
        <Grid xs={6}>
          <Grid item ><ClientAquisitionChart /></Grid>
        </Grid>
        <Grid xs={12}>
          <SalesByChart />
        </Grid>
      </Grid>
    </div>
  );
};

export default Charts;
