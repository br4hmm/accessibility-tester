const express = require('express');
const pa11y = require('pa11y');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is running on port ${port}...`));

app.use(express.static('public'));

app.get('/api/test', async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ error: 'URL is required!' });
  } else {
    const result = await pa11y(req.query.url);
    res.status(200).json(result);
  }
});
