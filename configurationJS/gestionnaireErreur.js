const sendError = (res, error) => {
    console.error("LOG DEV : ", error);

    // Erreurs de validation Mongoose 
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: "Erreur de validation", erreurs: messages });
    }

    // Erreurs de cast Mongoose 
    if (error.name === 'CastError') {
        return res.status(400).json({ message: "Format de données invalide (ID malformé)" });
    }

    
    if (error.isCustom) {
        return res.status(error.status).json({ message: error.message });
    }

    
    if (error.status) {
        return res.status(error.status).json({ message: error.message });
    }

    
    return res.status(500).json({ message: "Une erreur est survenue" });
}

module.exports = { sendError };