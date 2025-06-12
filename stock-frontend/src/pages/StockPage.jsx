import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";

import { getStockPriceHistory } from "../services/stockService";

const StockPage = () => {
  const { ticker } = useParams(); 
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5NzA1NTU4LCJpYXQiOjE3NDk3MDUyNTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJlZWFlNTg2LWRjZGEtNGQ1YS05MGVjLTk0NTYwNTRkOTQ2YiIsInN1YiI6InNyZWVqYWouYml0MjJAcmF0aGluYW0uaW4ifSwiZW1haWwiOiJzcmVlamFqLmJpdDIyQHJhdGhpbmFtLmluIiwibmFtZSI6InNyZWVqYSIsInJvbGxObyI6IjIyMTA4MDUxIiwiYWNjZXNzQ29kZSI6Ik1WR3dFRiIsImNsaWVudElEIjoiMmVlYWU1ODYtZGNkYS00ZDVhLTkwZWMtOTQ1NjA1NGQ5NDZiIiwiY2xpZW50U2VjcmV0IjoiRENqemZuVnh0UndVSlNlTiJ9.R_23Ti5kz3LtVGDROMTDF0-pD-D4ZcS9XHl2VhYzQ3s"); 
  const [minutes, setMinutes] = useState(30);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getStockPriceHistory(ticker, minutes, token);
        setPriceHistory(data);
      } catch (error) {
        console.error("Error fetching stock history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ticker) fetchHistory();
  }, [ticker, minutes, token]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Stock Details for {ticker}
      </Typography>

      <Box mb={2}>
        <TextField
          label="Time Range (minutes)"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <StockChart data={priceHistory} />
      )}
    </Container>
  );
};

export default StockPage;
