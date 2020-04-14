import { User } from "../model/user";
import { clientService } from "../services/database.service";
import { hashPassword } from "../services/Auth/password.service";

class UserRepository {
    private counter: number = 0;

    public async create(newUser: User) {
        this.counter +=1;
        const usersCollection = clientService.db().collection('users');
        const proxyUsersCollection = clientService.db().collection('users_proxy');
        const primaryId = this.counter;
        try {
            const proxy = await proxyUsersCollection.insertOne({
                _id: primaryId + 1,
                email: newUser.email
            });

            if (proxy) {
                return await this.createUser(newUser, primaryId, usersCollection);
            }
        } catch (e) {
            console.log('Duplicated email: ', e.errmsg);
            throw new Error('email_taken');
        }
    }

    private async createUser(newUser: User, primaryId: number, usersSiblingCollection) {
        const hashedPassword = await hashPassword(newUser.password);
        const newDocument = this.buildUserDocument(primaryId, newUser, hashedPassword);

        const result = await usersSiblingCollection.insertOne(newDocument);
        return result.ops;
    }

    private buildUserDocument(primaryId: number, newUser: User, hashedPassword?: string) {
        const newDocument = {
            _id: primaryId + 1,
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword,
            age: newUser.age
        };
        return newDocument;
    }

    public async findUserBy(email: string) {
        console.log('get-userId: ', email);
        const document: User = await clientService.db().collection('users').find({email: {$eq: email}})
            .project({'name': 1, '_id': 1, 'email': 1, 'password': 1, 'age': 1})
            .toArray();
        return document;
    }

    public async update(userId: number, data: any) {
        console.log('update: ', {userId, data});
        let updateUserDocument = {};
        // TODO: Move this separate class: HandleUpdateCriteria
        if (!data.password) {
            updateUserDocument = {
                name: data.name,
                email: data.email,
                age: data.age
            }
        } else {
            const hashedPassword = await hashPassword(data.password);
            updateUserDocument = {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                age: data.age
            }
        }

        // TODO: Handle special cases: (Now assume all fields were changed with the exceptional: password)
           // 1: email was not changed (No need to update users_proxy collection)
           // 2: password was not changed (No need to hash)
           // 3: when all fields were changed
        const proxyCollection = clientService.db().collection('users_proxy');
        const userCollection = clientService.db().collection('users');

        try {
            const proxy = await proxyCollection.updateOne({_id: {$eq: userId}}, {$set: {email: data.email}});

            if (proxy) {
                return await userCollection.updateOne({_id: {$eq: userId}}, {$set: updateUserDocument});
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
}

export const userRepository = new UserRepository();
