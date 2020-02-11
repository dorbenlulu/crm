import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import Typography from "@material-ui/core/Typography";

const ClientAquisitionChart = () => {
  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 }
  ];
  const data03 = [
    { name: "6-12 Months:", value: 131 },
    { name: "> 12 Months: ", value: 302 },
    { name: "Last Month: ", value: 22 }
  ];
  const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 }
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
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

      
        {/* <ResponsiveContainer width="100%">
          <PieChart width={730} height={250}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data03}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#82ca9d"
              label
            />
            <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer> */}


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
