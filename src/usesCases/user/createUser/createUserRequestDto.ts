import { UserRole } from "../../../types";

export interface CreateUserRequestDto {
    name?: string;
    email: string;
    password?: string;
    role?: UserRole;
}