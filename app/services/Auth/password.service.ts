const passwordValidator = require('password-validator');
import * as argon2 from 'argon2';
const schema = new passwordValidator();

export function checkPasswordPolicy(password: string) {
    schema.is().min(8)
        .is().max(20)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces();

    return schema.validate(password, { list: true })
}

export async function hashPassword(password: string) {
   return await argon2.hash(password);
}

export async function verifyPassword(hashedPassword: string, password: string) {
    return await argon2.verify(hashedPassword, password);
}
