import { User } from "../model/user";
import { hashPassword } from "../services/auth/validator/password.service";
import { storageService } from "../services/storage/storage.service";
import { UserNotFound } from "../Errors/user-not-found";
import { DBInterface } from "../services/storage/storage.interface";

class UserRepository {
    private counter: number = 0;
    private storageService: DBInterface;

    constructor() {
        this.storageService = storageService.instance;
    }

    public async create(newUser: User) {
        const hashedPassword = await hashPassword(newUser.password);
        const newDocument = UserRepository.buildUserDocument(this.counter +=1, newUser, hashedPassword);

        return this.storageService.create(newDocument, 'users');
    }

    private static buildUserDocument(primaryId: number, newUser: User, hashedPassword?: string) {
        return {
            _id: primaryId + 2,
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword,
            age: newUser.age
        };
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
        let updateUserDocument = {};
        // TODO: Move this to separate class: HandleUpdateCriteria
        if (!data.password) {
            Object.assign(updateUserDocument, {
                name: data.name,
                email: data.email,
                age: data.age
            });
        } else {
            const hashedPassword = await hashPassword(data.password);
            Object.assign(updateUserDocument, {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                age: data.age
            });
        }

        // TODO: Handle special cases: (Now assume all fields were changed with the exceptional: password)
           // 1: email was not changed (No need to update users_proxy collection)
           // 2: password was not changed (No need to hash)
           // 3: when all fields were changed
        return this.storageService.update(userId, updateUserDocument, 'users');
    }

    public async destroy(userId: number) {
        // TODO: if needed (Probably deactivate user's account)
            // if that the case: add field in the document to track
    }
}

export const userRepository = new UserRepository();
