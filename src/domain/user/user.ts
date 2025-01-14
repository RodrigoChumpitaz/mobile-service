import { err, ok, Result } from "neverthrow";
import { UserRole } from "../../types";
import { validateUser } from "./user.validation";

export interface IUserProps {
    name?: string;
    email: string;
    password?: string;
    role?: UserRole;
}

export class User {
    id?: string;
    name?: string;
    email: string;
    password?: string;
    role?: UserRole;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(props: IUserProps) {
        Object.assign(this, props);
    }

    static create(user: User): Result<User, string>{
        const { error } = validateUser(user);
        if(error) {
            const userError = error.details.map((detail) => detail.message).join('. ');
            return err(userError);
        }
        return ok(new User(user));
    }
}