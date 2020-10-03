const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.port || 8080;

app.use(morgan('tiny'));
app.get('/api/name', (req, res) => {
  const data = {
    username: "Saif",
    age: 5
  };
  res.json(data);
});

app.listen(PORT, console.log(`Server starting at ${PORT}`))
