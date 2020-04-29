import { UserModel } from "../../model/user.model";
import { hashPassword } from "../../services/auth/validator/password.service";

class User {
    private counter: number = 0;

    public withoutUserPassword(data: UserModel): Partial<UserModel> {
        return {
            name: data.name,
            email: data.email,
            age: data.age
        }
    }

    public async withUserPassword(data: UserModel): Promise<Partial<UserModel>> {
        const userObj: Partial<UserModel> = {
            password: await hashPassword(data.password),
        };

        return Object.assign(userObj, this.withoutUserPassword(data));

    }

    public async fullUser(data: UserModel): Promise<Partial<UserModel>> {
        const user: Partial<UserModel> = await this.withUserPassword(data);
        return Object.assign(user, this.uniqueId());
    }

    private uniqueId(): Partial<UserModel> {
        return {
            _id: this.counter + 1
        }
    }
}

export const user = new User();
