import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import Typography from "@material-ui/core/Typography";

const ClientAquisitionChart = () => {

  const data03 = [
    { name: "6-12 Months:", value: 131 },
    { name: "> 12 Months: ", value: 302 },
    { name: "Last Month: ", value: 22 }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{height: "100%"}}>
      <Typography variant="h6" gutterBottom style={{ textAlign: "left" }}>
        Client Aquisition
      </Typography>
        <PieChart width={200} height={200} margin={{top: 0}}>
          <Pie
            data={data03}
            cx={100}
            cy={100}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data03.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
    </div>
  );
};

export default ClientAquisitionChart;
