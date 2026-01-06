const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = 3000;




mongoose.connect('mongodb://127.0.0.1:27017/cahier_de_recettes')
  .then(() => {
    console.log('Connecté à MongoDB avec succès');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });

app.get('/', (req, res) => {
  res.send('API Cahier de Recettes est en ligne !');
});


app.use('/utilisateurs', utilisateurRoutes);
app.use('/recettes', recetteRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
