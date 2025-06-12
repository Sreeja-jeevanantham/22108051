import React, { useEffect, useState } from 'react';
import { getStockPriceHistory } from "../services/stockService";

import { Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';

const StockPage = ({ token, selectedTicker }) => {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getStockPriceHistory(selectedTicker, 30, token);
      setPriceData(data);
    }
    fetchData();
  }, [selectedTicker, token]);

  const prices = priceData.map(p => p.price);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  const chartData = {
    labels: priceData.map(p => new Date(p.lastUpdatedAt).toLocaleTimeString()),
    datasets: [
      {
        label: 'Stock Price',
        data: prices,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Average Price',
        data: new Array(prices.length).fill(avg),
        borderColor: 'red',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  return (
    <>
      <Typography variant="h5">{selectedTicker} - Last 30 Minutes</Typography>
      <Line data={chartData} />
    </>
  );
};

export default StockPage;
