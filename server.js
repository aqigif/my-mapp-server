const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.get('/maps/:place_id', (req, res) => {
  const place_id = req.params.place_id;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`;

  axios.get(apiUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('An error occurred while fetching data from the Google Maps API');
    });
});

app.get('/maps/photo/:maxwidth/:photoreference', (req, res) => {
  const photoreference = req.params.photoreference;
  const maxwidth = req.params.maxwidth;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoreference}&maxwidth=${maxwidth}&key=${apiKey}`;

  axios.get(apiUrl, { responseType: 'arraybuffer' })
    .then((response) => {
      res.set('Content-Type', 'image/jpeg');
      res.send(Buffer.from(response.data, 'binary'));
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('An error occurred while fetching data from the Google Maps API');
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
