import { User } from "../model/user";
import { hashPassword } from "../services/auth/validator/password.service";
import { storageService } from "../services/storage/storage.service";
import { EmailError } from "../Errors/EmailError";
import {UserNotFoundError} from "../Errors/UserNotFoundError";

class UserRepository {
    private counter: number = 0;
    private storageService;

    constructor() {
        this.storageService = storageService.instance;
    }

    public async create(newUser: User) {
        this.counter +=1;
        const primaryId = this.counter;
        try {
            this.storageService.setCollection('users_proxy');
            const proxy = await this.storageService.create({
                _id: primaryId + 3,
                email: newUser.email
            });

            if (proxy) {
                return this.createUser(newUser, primaryId);
            }
        } catch (e) {
            throw new EmailError();
        }
    }

    private async createUser(newUser: User, primaryId: number) {
        const hashedPassword = await hashPassword(newUser.password);
        const newDocument = this.buildUserDocument(primaryId, newUser, hashedPassword);

        this.storageService.setCollection('users');
        return await this.storageService.create(newDocument);
    }

    private buildUserDocument(primaryId: number, newUser: User, hashedPassword?: string) {
        const newDocument = {
            _id: primaryId + 3,
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword,
            age: newUser.age
        };
        return newDocument;
    }

    public async findByEmail(userEmail: string) {
        this.initCollection();
        const project = {'name': 1, '_id': 1, 'email': 1, 'password': 1, 'age': 1};
        return await this.storageService.findByEmail(userEmail, project);
    }

    public async findById(userId: number) {
        this.initCollection();
        const project = {'name': 1, '_id': 1, 'email': 1, 'age': 1, 'bookings': 1};
        const result = await this.storageService.findById(userId, project);

        if (!result.length) {
            throw new UserNotFoundError();
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
        const dbInstance = this.storageService.instance.getInstance();
        const usersCollection = dbInstance.collection('users');
        const proxyUsersCollection = dbInstance.collection('users_proxy');

        try {
            const proxy = await proxyUsersCollection.updateOne({_id: {$eq: userId}}, {$set: {email: data.email}});

            if (proxy) {
                return await usersCollection.updateOne({_id: {$eq: userId}}, {$set: updateUserDocument});
            }
        } catch (e) {
            console.log('Update err: ', e.errmsg);
            throw new Error(e.errmsg);
        }
    }

    public async destroy(userId: number) {
        // TODO: if needed (Probably deactivate user's account)
            // if that the case: add field in the document to track
    }

    private initCollection() {
        this.storageService.setCollection('users');
    }
}

export const userRepository = new UserRepository();
