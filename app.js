const express = require('express');
const { json } = require('body-parser');

const app = express();

app.use(json());

app.get('/', (req, res, next) => {
  res.send('Hello world');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
