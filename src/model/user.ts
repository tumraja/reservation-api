export interface User extends UserCredentail{
    _id: number;
    name: string;
    age: number;
}

export interface UserCredentail {
    email: string,
    password: string
}
