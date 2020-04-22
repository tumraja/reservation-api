import { Request, Response } from "express";
import { attemptLogin } from "../services/Auth/login.service";

class LoginController {
    public login(req: Request, resp: Response) {
        const loginCredentials = req.body;

        try {
            attemptLogin(loginCredentials, resp);
        } catch (e) {
            console.log('err-login: ', e.toString());
        }
    }
}

export const loginController = new LoginController();
