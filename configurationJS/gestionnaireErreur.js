const sendError = (res, error) => {
    console.error("LOG DEV : ", error);

    
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


}

module.exports = { sendError };