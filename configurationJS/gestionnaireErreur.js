const sendError = (res, error) => {
    console.error("LOG DEV : ", error);

    // gestion des erreurs par Joi
    if(error.details){
        const messages = error.details.map(d=>d.message);
        return res.status(400).json({message:"Erreur de validation",erreurs:messages});
    }

    // gestion des erreurs Mongoos
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: "Erreur de validation", erreurs: messages });
    }

    
    if (error.name === 'CastError') {
        return res.status(400).json({ message: "Format de données invalide (ID malformé)" });
    }


    if (error.isCustom) {
        return res.status(error.status).json({ message: error.message });
    }


    if (error.status) {
        return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({message:"Erreur interne du serveur"});


}

module.exports = { sendError };