import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useExpenseContext } from "./ExpenseContext";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";

const CategoryBarChart = () => {
  const { transactions } = useExpenseContext();

  const categories = [
    "Shopping",
    "Transportation",
    "Food",
    "Healthcare",
    "Other",
  ];

  const currentAmounts: { [key: string]: number } = {};

  categories.forEach((category) => {
    currentAmounts[category] = 0;
  });

  transactions.forEach((transaction) => {
    const { category, amount } = transaction;
    currentAmounts[category] += amount;
  });

  const xValues = Object.keys(currentAmounts);
  const yValues = Object.values(currentAmounts);

  const xLabels = xValues.map((category) => category.charAt(0));

  return (
    <Box
      sx={{
        marginLeft: -2,
        width: 700,
        height: 200,
      }}
    >
      <BarChart
        xAxis={[{ scaleType: "band", data: xLabels }]}
        series={[
          {
            data: yValues,
            color: blue[500],
          },
        ]}
        width={350}
        height={200}
      />
    </Box>
  );
};

export default CategoryBarChart;
