import { User } from "../domain";
import { IUserDb } from "../types";

export class UserMap {
    static toDbFromDomain(user: IUserDb): User {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
}