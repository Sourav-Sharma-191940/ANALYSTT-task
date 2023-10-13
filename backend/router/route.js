const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define the API route
router.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const data = response.data;
    res.json(data);
    console.log('data has fetched')
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Error fetching data from the API' });
  }
});

module.exports = router;
