const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const httpapi = "https://dogapi.dog/api/v2/breeds";

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(httpapi);
        res.json(response.data);
    } catch (error) {
        console.error(`Error from API: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});