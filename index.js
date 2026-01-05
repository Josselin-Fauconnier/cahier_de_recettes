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
  res.send('essaie node , express et mongoDB !');
});

app.get('/recettes', (req,res) =>{
  res.send('Voici les recettes !');
});

app.get('/utilisateurs', (req,res)=>{
  res.send('Voici les utilisateurs !');
})

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
