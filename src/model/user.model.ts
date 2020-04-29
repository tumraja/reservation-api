export interface UserModel extends UserCredential{
    _id?: number;
    name: string;
    age: number;
}

export interface UserCredential {
    email: string,
    password: string
}
