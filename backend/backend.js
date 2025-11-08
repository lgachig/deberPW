const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const httpapi = "https://dogapi.dog/api/v2/breeds";

app.use(express.json());
app.use(cors());

// Servir archivos estáticos del frontend
const frontendPath = path.join(__dirname, '..', 'frontEnd');
app.use(express.static(frontendPath));

// Ruta de API para buscar razas
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

// Servir index.html para la ruta raíz y todas las demás rutas (excepto /breed)
app.get('*', (req, res) => {
  if (req.path !== '/breed') {
    res.sendFile(path.join(frontendPath, 'index.html'));
  }
});

const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor escuchando en http://0.0.0.0:3001");
  console.log("Frontend disponible en http://tu-ip-ec2:3001");
});