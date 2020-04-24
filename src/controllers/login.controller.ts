import { Request, Response } from "express";
import { attemptLogin } from "../services/auth/login.service";

class LoginController {
    public async login(req: Request, resp: Response) {
        const loginCredentials = req.body;

        try {
            await attemptLogin(loginCredentials, resp);
        } catch (e) {
            resp.status(200).json({"error": [e]});
        }
    }
}

export const loginController = new LoginController();
