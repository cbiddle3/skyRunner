const express = require('express');
const cors = require('cors');
const path = require('path');
const randomization = require('./build/Release/randomization.node');

const app = express();
app.use(express.static('public'));
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3001'
}));

const publicPath = path.join(__dirname, 'public');


app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(publicPath, 'favicon.ico'));
});


app.get('/api/random-building-data', (req, res) => {
  const numOfBuildings = 10
  let randomBuildings = []
  for (x = 0; x < numOfBuildings; x++) {
    randomBuildings.push(randomization.GetRandomBuilding())
  }
  res.json({ data: randomBuildings });
});

app.get('/api/random-gap', (req, res) => {
  const numOfGaps = 10
  let randGaps = []
  for (x =0; x < numOfGaps; x++) {
    randGaps.push(randomization.GetRandomGap())
  }
  res.json({ randGaps });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});