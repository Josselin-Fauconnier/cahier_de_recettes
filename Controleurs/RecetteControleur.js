const Recette = require ('../Modeles/Recette');

exports.createRecette = async (req , res) => {
    try {
       const recette = new Recette ({
        ...req.body
       });
       await recette.save();

       res.status (201).json({message: 'recette créée',recette});
    }catch(error) {
res.status(400).json({error: error.message})
    
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