const zodValidation = (data,schema) => {
    try{
        const validatedData = schema.parse(data);
        return validatedData;
    }catch(err){
        return null;
    }
}

export default zodValidation;