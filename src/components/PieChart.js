import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
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
import { DOMAINS } from "../constants";
ChartJS.register(ArcElement, Tooltip, Legend);

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

var colors = [];

for (var i = 0; i < 10; i++) {
  colors.push(random_rgba());
}

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Publications per Domain",
    },
  },
};

export default function PieChart(props) {
  const { publications } = props;
  const data = {
    labels: DOMAINS,
    datasets: [
      {
        data: DOMAINS.map((dom) => {
          var count = 0;
          publications.forEach((p) => {
            p.domains &&
              p.domains.forEach((d) => {
                if (d === dom) {
                  count++;
                }
              });
          });
          return count;
        }),
        backgroundColor: colors,
      },
    ],
  };
  return (
    <Box w="30%">
      {" "}
      <Pie data={data} options={options} />
    </Box>
  );
}
