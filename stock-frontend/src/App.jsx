import React, { useState } from 'react';
import StockList from './components/StockList';
import StockPage from './pages/StockPage';
import { Container, Typography } from '@mui/material';

const App = () => {
  const [selectedTicker, setSelectedTicker] = useState('');
  const token = localStorage.getItem('accessToken');

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Stock Aggregator</Typography>
      <StockList token={token} onStockSelect={setSelectedTicker} />
      {selectedTicker && <StockPage token={token} selectedTicker={selectedTicker} />}
    </Container>
  );
};

export default App;
