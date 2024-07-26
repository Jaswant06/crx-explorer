const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes will be added here
// Home route
app.get('/', (req, res) => {
    res.render('home');
  });
  
  // Search route
// Search route
app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
      return res.redirect('/');
    }
  
    try {
      const response = await axios.get(`https://api.crxcavator.io/v1/search?q=${encodeURIComponent(query)}`);
      const results = response.data;
      res.render('results', { query, results, error: null });
    } catch (error) {
      console.error('Error fetching data from CRXcavator API:', error.message);
      res.render('results', { query, results: [], error: 'An error occurred while fetching data.' });
    }
  });

app.listen(port, () => {
  console.log(`CRX Explorer app listening at http://localhost:${port}`);
});