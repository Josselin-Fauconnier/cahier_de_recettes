const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const recetteRoutes = require('./Routes/RecetteRoutes');


const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});




mongoose.connect(config.url)
  .then(() => {
    console.log('Connecté à MongoDB avec succès');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });

app.get('/', (req, res) => {
  res.send('Mon API cahier de recettes');
});



app.use('/recettes', recetteRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
