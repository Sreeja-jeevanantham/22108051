import React, { useEffect, useState } from 'react';
import { getAllStocks } from '../services/stockService';
import { List, ListItem, ListItemText } from '@mui/material';

const StockList = ({ token, onStockSelect }) => {
  const [stocks, setStocks] = useState({});

  useEffect(() => {
    async function fetchStocks() {
      const data = await getAllStocks(token);
      setStocks(data.stocks);
    }
    fetchStocks();
  }, [token]);

  return (
    <List>
      {Object.entries(stocks).map(([name, ticker]) => (
        <ListItem button key={ticker} onClick={() => onStockSelect(ticker)}>
          <ListItemText primary={`${name} (${ticker})`} />
        </ListItem>
      ))}
    </List>
  );
};

export default StockList;
