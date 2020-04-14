import { User } from "../../model/user";
import { userRepository } from "../../repository/user.repository";
import {verifyPassword} from "./password.service";
import { Response } from "express";

export async function attemptLogin(credentials, resp: Response) {
    const user = await userRepository.findUserBy(credentials.email);

    console.log('dfffff: ', user);
    if (!user) {
        throw new Error('There was a problem logging in. Check your email and password or create an account.');
    }

    console.log('check: ', credentials.password);
    console.log('await: ', await verifyPassword(user.password, credentials.password))
    if (await verifyPassword(user.password, credentials.password)) {
        console.log('-verify: ');

        console.log('user: ', user);
        resp.status(200).json(user);
    } else {
        console.log('no-verify: ');
        resp.status(200).json({"error": "Please check your email or password again"});
    }
   // delete user.password;

    return user;
}
