const Recette = require('../Modeles/Recette');

exports.createRecette = async (req, res) => {
    try {
        const recetteObject = req.body;
        
        
        
        if (!recetteObject.Titre || recetteObject.Titre.trim().length < 3) {
             return res.status(400).json({ message: "Le titre doit contenir au moins 3 caractères." });
        }
        
        if (Number(recetteObject.Preparation) <= 0 || Number(recetteObject.Temps_cuisson) <= 0) {
            return res.status(400).json({ message: "Les temps de préparation et de cuisson doivent être des nombres positifs." });
        }
       
        if (recetteObject.Prix && Number(recetteObject.Prix) < 0) {
            return res.status(400).json({ message: "Le prix ne peut pas être négatif." });
        }
     
        const niveauxValides = ['Facile', 'Moyen', 'Difficile'];
        if (recetteObject.Difficulte && !niveauxValides.includes(recetteObject.Difficulte)) {
            return res.status(400).json({ message: "Niveau de difficulté invalide. Choix valide : Facile, Moyen ou Difficile." });
        }
      
        const recette = new Recette({
            ...recetteObject,
            
            PhotosUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
        });
        await recette.save();
        res.status(201).json({ message: 'Recette créée avec succès', recette });
    } catch (error) {
      
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: "Erreur de validation des données", erreurs: messages });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.getAllRecettes = async (req, res) => {
    try {
        const { ingredient, tri, ordre, prixMax, tempsPrepaMax, tempsCuissonMax } = req.query;
        let filtre = {};

        
        if (ingredient) {
            filtre.ingredients = { $in: [new RegExp(ingredient, 'i')] };
        }


        
        if (prixMax) {
            filtre.Prix = { $lte: Number(prixMax) };
        }

        if (tempsPrepaMax) {
            filtre.Preparation = { $lte: Number(tempsPrepaMax) };
        }

        
        if (tempsCuissonMax) {
            filtre.Temps_cuisson = { $lte: Number(tempsCuissonMax) };
        }

        
        let sortOption = {};

        
        if (tri) {
            const sens = ordre === 'asc' ? 1 : -1;
            switch (tri) {
                case 'prix':
                    sortOption = { Prix: sens };
                    break;
                case 'preparation':
                    sortOption = { Preparation: sens };
                    break;
                case 'cuisson':
                    sortOption = { Temps_cuisson: sens };
                    break;
                case 'date':
                    sortOption = { Date: sens };
                    break;
                default:
                    sortOption = { Date: -1 }; 
            }
        } else {
            sortOption = { Date: -1 }; 
        }

        const recettes = await Recette.find(filtre).sort(sortOption);

        res.status(200).json({
            count: recettes.length,
            resultats: recettes
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des recettes",
            error: error.message
        });
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
        await Recette.updateOne({ _id: req.params.id }, { ...req.body });
        res.status(200).json({ message: 'Recette mis à jour' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteRecette = async (req, res) => {
    try {
        await Recette.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Recette supprimée' });
    } catch (error) {
        res.status(400).json({ error: error.message });
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
