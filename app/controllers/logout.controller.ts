import { Request, Response } from "express";
import {sessionRepository} from "../repository/session.repository.";

class LogoutController {
    public async logout(req: Request, resp: Response) {
        const sessionId = req.cookies.cookies['SESSID'];

        console.log(sessionId);
        if (await sessionRepository.destroy(sessionId)) {
            resp.clearCookie('SESSID');
            resp.sendStatus(200);
        } else {
            resp.sendStatus(403);
        }
    }
}

export const logoutController = new LogoutController();
