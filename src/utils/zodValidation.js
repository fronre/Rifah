const zodValidation = (data,schema) => {
    try{
        const validatedData = schema.parse(data);
        return validatedData;
    }catch(err){
        console.log(err);
        return null;
    }
}

export default zodValidation;