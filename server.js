const express = require('express');
const cors = require('cors');

const productsRoute = require('./routes/productsRoute');

const app = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.get('/', (req, res, next) => {
  try {
    res.status(200).send('Hello world!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.use('/products', productsRoute);

app.listen(port, () => console.log('Listening on port', port));
