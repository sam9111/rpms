import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Input,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Publications by Year",
    },
  },
};

const labels = [
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
];

export default function BarChart(props) {
  const { publications } = props;
  const data = {
    labels,
    datasets: [
      {
        label: "Publications",
        data: labels.map(
          (l) =>
            publications.filter((p) => {
              var date = new Date(p.date);
              var year = date.getFullYear();
              return year.toString() === l;
            }).length
        ),
      },
    ],
  };
  return (
    <Box w="50%" mx="auto">
      {" "}
      <Bar options={options} data={data} />
    </Box>
  );
}
