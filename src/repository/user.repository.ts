import { user } from "./builder/user.builder";
import { storageService } from "../services/storage/storage.service";
import { UserModel } from "../model/user.model";
import { UserNotFound } from "../errors/user-not-found";
import { DBQueryBuilderInterface } from "../services/storage/storage.interface";

class UserRepository {
    private storageService: DBQueryBuilderInterface;

    constructor() {
        this.storageService = storageService.getInstance;
    }

    public async create(newUser: UserModel) {
        const newDocument = await user.fullUser(newUser);
        return this.storageService.create(newDocument, 'users');
    }

    public async findByEmail(userEmail: string) {
        const project = {'name': 1, '_id': 1, 'email': 1, 'password': 1, 'age': 1};
        return await this.storageService.selectByEmail(userEmail, 'users', project);
    }

    public async findById(userId: number) {
        const project = {'name': 1, '_id': 1, 'email': 1, 'age': 1, 'bookings': 1};
        const result = await this.storageService.selectById(userId, 'users', project);

        if (!result.length) {
            throw new UserNotFound();
        }

        return result;
    }

    public async update(userId: number, data: any) {
        let userDocument;

        if (!data.password) {
            userDocument = user.withoutUserPassword(data);
        } else {
            userDocument = await user.withUserPassword(data);
        }

        // TODO: Handle special cases: (Now assume all fields were changed with the exceptional: password)
           // 1: email was not changed (No need to update users_proxy collection)
           // 2: password was not changed (No need to hash)
           // 3: when all fields were changed
        return this.storageService.update(userId, userDocument, 'users');
    }

    public async destroy(userId: number) {
        // TODO: if needed (Probably deactivate user's account)
            // if that the case: add field in the document to track
    }
}

export const userRepository = new UserRepository();
