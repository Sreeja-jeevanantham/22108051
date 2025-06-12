import React, { useEffect, useState } from 'react';
import { getAllStocks } from '../services/stockService';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('accessToken'); // Set after registration/auth

  useEffect(() => {
    async function fetchStocks() {
      try {
        const data = await getAllStocks(token);
        setStocks(data.stocks || {});
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
  }, [token]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Available Stocks</Typography>
      {loading ? <CircularProgress /> : (
        <List>
          {Object.entries(stocks).map(([name, ticker]) => (
            <ListItem key={ticker} button component={Link} to={`/stock/${ticker}`}>
              <ListItemText primary={`${name} (${ticker})`} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default HomePage;
