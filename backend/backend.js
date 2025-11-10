const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const httpapi = "https://dogapi.dog/api/v2/breeds";

app.use(express.json());
app.use(cors());
app.get('/breed', async (req, res) => {
  try {
    const nameQuery = req.query.name?.toLowerCase() || '';
    const response = await axios.get(httpapi);

    const breeds = response.data.data.filter(breed =>
      breed.attributes.name.toLowerCase().includes(nameQuery)
    );

    res.json({ data: breeds });
  } catch (error) {
    console.error(`Error from API: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor backend escuchando en http://0.0.0.0:${PORT}`);
});