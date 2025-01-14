import { UserRole } from "../user-auth";

export interface IUserDb {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}