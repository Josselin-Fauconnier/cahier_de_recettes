const express = require('express');
const mongoose = require('mongoose');
const recetteRoutes = require('./Routes/RecetteRoutes');


const app = express();
const port = 3000;

app.use(express.json());




mongoose.connect('mongodb+srv://Josselin:Hydra+1234@josselin.v6orhgg.mongodb.net/?appName=Josselin')
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
