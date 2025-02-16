import { Request, Response } from "express";
import { createUser } from "../usesCases/user/createUser";
import { response } from "../utils";
import { StatusCode } from "../types";
import { CreateUserBadRequestError } from "../usesCases/user/createUser/createUserErrors";
import { signInUser } from "../usesCases/user/signinUser";
import { SigninUserBadRequestError, SigninUserEmailNotFoundError } from "../usesCases/user/signinUser/signinUserErrors";
import { getUserById } from "../usesCases/user/getUserById";
import { GetUserByIdBadRequestError, GetUserByIdNotFoundError } from "../usesCases/user/getUserById/getUserByIdErrors";

export class UserController {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    async createUser(req: Request, res: Response) {
        const result = await createUser.execute(req.body);
        if(result.isErr()) {
            const error = result.error;
            switch(error.constructor) {
                case CreateUserBadRequestError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, StatusCode.CREATED);
    }

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await signInUser.execute({ email, password });
        if(result.isErr()) {
            const error = result.error;
            switch(error.constructor) {
                case SigninUserBadRequestError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
                case SigninUserEmailNotFoundError:
                    return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, StatusCode.OK);
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await getUserById.execute({ id });
        if(result.isErr()) {
            const error = result.error;
            switch(error.constructor) {
                case GetUserByIdBadRequestError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
                case GetUserByIdNotFoundError:
                    return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, StatusCode.OK);
    }
}