const sendError =(res,error) =>{
    console.error("LOG DEV : ",error);

    if(errorIsCustom){
        return res.status(error.status).json({message:error.message});
    }

    return res.status(500).json({message:"une erreur est survenue"});
}

module.exports={sendError};