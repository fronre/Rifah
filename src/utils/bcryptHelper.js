import { hash , compare} from "bcrypt"
export const hashPasswrod = (password) => {
    return  hash(password,14);
}

export const comparePassword = (password,hashedPassword) =>{
    return compare(password,hashedPassword)
}