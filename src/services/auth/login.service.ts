import { userRepository } from "../../repository/user.repository";
import { verifyPassword } from "./validator/password.service";
import { Response } from "express";
import { User, UserCredentail } from "../../model/user";
import { session } from "./session.service";
import { sessionRepository } from "../../repository/session.repository.";
import { Login } from "../../Errors/login";

export async function attemptLogin(credentials: UserCredentail, resp: Response) {
    const users: User[] = await userRepository.findByEmail(credentials.email);

    const user = users[0];
    if (!user) {
        throw new Login();
    }

    if (await verifyPassword(user.password, credentials.password)) {
        delete user.password;
        const sessionId = await session(32).then(bytes => bytes.toString('hex'));
        const userSession = await sessionRepository.create({_id: sessionId, userId: user._id});

        if (userSession.length) {
            resp.cookie('SESSID', sessionId, {httpOnly: true,  secure: true});
            resp.status(200).json({"result": user});
        } else {
            throw new Login();
        }
    } else {
        throw new Login();
    }
}
