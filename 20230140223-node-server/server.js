const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // izinkan request dari browser (menghindari CORS)

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Server!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
