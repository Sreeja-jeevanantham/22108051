const BASE_URL = 'http://20.244.56.144/evaluation-service';

const headers = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export async function getAllStocks(token) {
  const res = await fetch(`${BASE_URL}/stocks`, { headers: headers(token) });
  if (!res.ok) throw new Error('Failed to fetch stocks');
  return await res.json();
}

export async function getLatestStockPrice(ticker, token) {
  const res = await fetch(`${BASE_URL}/stocks/${ticker}`, { headers: headers(token) });
  if (!res.ok) throw new Error('Failed to fetch latest stock price');
  return await res.json();
}

export async function getStockPriceHistory(ticker, minutes, token) {
  const res = await fetch(`${BASE_URL}/stocks/${ticker}?minutes=${minutes}`, {
    headers: headers(token),
  });
  if (!res.ok) throw new Error('Failed to fetch stock price history');
  return await res.json();
}
