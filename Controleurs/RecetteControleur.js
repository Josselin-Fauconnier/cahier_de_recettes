const Recette = require ('../Modeles/Recette');

exports.createRecette = async (req, res) => {
  try {
    const recetteObject = req.body;
    
    const recette = new Recette({
      ...recetteObject,
      
      PhotosUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    });
    await recette.save();
    res.status(201).json({ message: 'Recette enregistrée !', recette });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRecettes = async (req , res) => {
    try {
        const recettes = await Recette.find();
        res.status(200).json(recettes);
    }catch(error){
        res.status(400).json({error: error.message})
    }
};

exports.getRecetteById = async (req, res) => {
  try {
    const recette = await Recette.findOne({ _id: req.params.id });
    if (!recette) {
      return res.status(404).json({ message: 'Recette non trouvée !' });
    }
    res.status(200).json(recette);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateRecette = async (req, res) => {
    try {
        await Recette.updateOne({_id: req.params.id},{... req.body});
        res.status(200).json({message:'Recette mis à jour'});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

exports.deleteRecette = async (req, res) => {
    try {
        await Recette.deleteOne({_id: req.params.id});
        res.status(200).json({message: 'Recette supprimée'});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}



exports.addCommentaire = async (req, res) => {
    try {
        const { auteur, contenu } = req.body;
        const { id } = req.params;

       
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID de recette invalide" });
        }

        
        if (
            typeof auteur !== "string" ||
            typeof contenu !== "string" ||
            auteur.trim().length === 0 ||
            contenu.trim().length === 0
        ) {
            return res.status(400).json({
                message: "Auteur et contenu doivent être des chaînes non vides"
            });
        }

        const commentaire = {
            auteur: auteur.trim(),
            contenu: contenu.trim(),
            createdAt: new Date()
        };

        const recette = await Recette.findByIdAndUpdate(
            id,
            { $push: { commentaires: commentaire } },
            { new: true }
        );

        if (!recette) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

      
        res.status(201).json(recette);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
