import { Request, Response } from "express";
import { User } from "../model/user";
import { userRepository } from "../repository/user.repository";
import { checkPasswordPolicy } from "../services/auth/validator/password.service";
import { isEmailValid } from "../services/auth/validator/email-validator.service";

class UserController {
    public async create(req: Request, resp: Response) {
        let error: string[] = [];

        const newUser = req.body;
        const list = checkPasswordPolicy(newUser.password);

        if (!isEmailValid(newUser.email)) {
            error = ['email'];
        }

        if (list.length) {
            error = [...error, ...list];
            resp.status(400).json({error});
        } else {
            try {
                const document: User = await userRepository.create(newUser);
                resp.status(200).json({'results': document});
            } catch(err) {
                resp.status(400).json({err});
            }
        }
    }

    public async get(req: Request, resp: Response) {
        const userId = parseInt(req.params.id);
        const sessionId = req.cookies['SESSID'];

        // if (!await sessionRepository.get(sessionId)) {
        //     resp.status(403).json({"error": 'Please check your account again or login'})
        // }

        if (userId) {
            try {
                const user = await userRepository.findById(userId);
                resp.status(200).json({'results': user});
            } catch (error) {
                resp.status(400).json(error);
            }
        } else {
            resp.status(400).json({"error": "Please check you account or login"});
        }
    }

    public async update(req: Request, resp: Response) {
        let listError: string[];

        const userId = parseInt(req.params.id);
        const updateUser = req.body;
        listError = updateUser.password ? checkPasswordPolicy(updateUser.password) : [];

        if (!isEmailValid(updateUser.email)) {
            listError.push('email');
        }

        if (listError.length) {
            resp.status(400).json({listError});
        } else {
            try {
                const document: User = await userRepository.update(userId, updateUser);
                resp.status(200).json({'results': document});
            } catch(err) {
                const {key, value} = err.toString().split(':');
                resp.status(400).json({err});
            }
        }
    }
}

export const userController = new UserController();
