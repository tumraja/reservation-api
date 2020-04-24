import { userRepository } from "../../repository/user.repository";
import { verifyPassword } from "./validator/password.service";
import { Response } from "express";
import { User, UserCredentail } from "../../model/user";
import { session } from "./session.service";
import { sessionRepository } from "../../repository/session.repository.";

export async function attemptLogin(credentials: UserCredentail, resp: Response) {
    const user: User = await userRepository.findByEmail(credentials.email);

    if (!user) {
        throw new Error('Check your email and password or create an account.');
    }

    if (await verifyPassword(user.password, credentials.password)) {
        delete user.password;
        const sessionId = await session(32).then(bytes => bytes.toString('hex'));
        const isSessionCreated = await sessionRepository.create({_id: sessionId, userId: user._id});

        if (isSessionCreated) {
            resp.cookie('SESSID', sessionId, {httpOnly: true,  secure: true});
            resp.status(200).json({"result": user});
        } else {
            throw new Error('Check your email and password or create an account.');
        }
    } else {
        resp.status(200).json({"error": ["login"]});
    }
}
