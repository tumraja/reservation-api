import { Request, Response } from "express";
import { User } from "../model/user";
import { userRepository } from "../repository/user.repository";
import { checkPasswordPolicy } from "../services/Auth/password.service";
import { emailValidatorService } from "../services/Auth/email-validator.service";

class UserController {
    public async create(req: Request, resp: Response) {
        let error: string[] = [];

        const newUser = req.body;
        const list = checkPasswordPolicy(newUser.password);
        const isEmailValid = emailValidatorService(newUser.email);

        console.log('isEmailValid: ', isEmailValid);
        if (!isEmailValid) {
            error = ['email'];
        }

        if (list.length || error.length) {
            error = [...error, ...list]; // TODO: Bug error
            resp.status(400).json({error});
            error = [];
        } else {
            try {
                const document: User = await userRepository.create(newUser);
                resp.status(200).json({'results': document});
            } catch(err) {
                console.log('err: ', err.toString());
                const errMsg = err.toString().split(':')[1].trim();
                error = [errMsg];
                resp.status(400).json({error});
            }
        }
    }

    public async update(req: Request, resp: Response) {
        let error: string[] = [];

        const userId = parseInt(req.params.id);
        const updateUser = req.body;
        const list = checkPasswordPolicy(updateUser.password);
        const isEmailValid = emailValidatorService(updateUser.email);

        console.log('isEmailValid: ', isEmailValid);
        if (!isEmailValid) {
            error = ['email'];
        }

        if (list.length || error.length) {
            error = [...error, ...list]; // TODO: Bug error
            resp.status(400).json({error});
            error = [];
        } else {
            try {
                const document: User = await userRepository.update(userId, updateUser);
                resp.status(200).json({'results': document});
            } catch(err) {
                console.log('err: ', err.toString());
                const {key, value} = err.toString().split(':');
                error = [value.trim()];
                resp.status(400).json({error});
            }
        }
    }
}

export const userController = new UserController();
