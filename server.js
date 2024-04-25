const express = require('express');
const app = express();

// Replace with your actual logic to retrieve items from Google Store
function getItemsFromStore() {
  // Implement logic to fetch items based on session_id and item (possibly empty)
  // This could involve database queries, API calls, etc.
  // Replace with your actual implementation
  const results = ['Phone', 'Apple'];
  return results;
}

// Replace with your actual logic to manage shopping cart
let shoppingCart = {};

function addToCart(sessionId, item, quantity) {
  if (!shoppingCart[sessionId]) {
    shoppingCart[sessionId] = {};
  }
  shoppingCart[sessionId][item] = (shoppingCart[sessionId][item] || 0) + quantity;
  return Object.keys(shoppingCart[sessionId]);
}

function removeFromCart(sessionId, item, quantity) {
  if (!shoppingCart[sessionId] || !shoppingCart[sessionId][item]) {
    return [];
  }
  shoppingCart[sessionId][item] -= quantity;
  if (shoppingCart[sessionId][item] <= 0) {
    delete shoppingCart[sessionId][item];
  }
  return Object.keys(shoppingCart[sessionId]);
}

function viewCart(sessionId) {
  return shoppingCart[sessionId] || {};
}

function placeOrder(sessionId) {
  if (!shoppingCart[sessionId]) {
    return [];
  }

  // Simulate order placement (replace with actual order processing logic)
  const orderItems = Object.keys(shoppingCart[sessionId]);
  shoppingCart[sessionId] = {}; // Clear shopping cart after order placement
  return orderItems;
}

app.get('/get_items', (req, res) => {
  // const { session_id, item } = req.body;

  try {
    const results = getItemsFromStore();
    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/add_to_shopping_cart', (req, res) => {
  const { session_id, item, quantity } = req.body;

  if (!session_id) {
    return res.status(400).json({ message: 'Missing session_id' });
  }

  try {
    const results = addToCart(session_id, item, quantity);
    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/remove_from_shopping_cart', (req, res) => {
  const { session_id, item, quantity } = req.body;

  if (!session_id) {
    return res.status(400).json({ message: 'Missing session_id' });
  }

  try {
    const results = removeFromCart(session_id, item, quantity);
    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/view_shopping_cart', (req, res) => {
  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json({ message: 'Missing session_id' });
  }

  try {
    const results = viewCart(session_id);
    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/place_order', (req, res) => {
  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json({ message: 'Missing session_id' });
  }

  try {
    const results = placeOrder(session_id);
    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
