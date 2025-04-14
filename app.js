const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from express', app: 'Voya' });
});

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
