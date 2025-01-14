import { Request, Response } from "express";
import { createUser } from "../usesCases/user/createUser";
import { response } from "src/utils";
import { StatusCode } from "src/types";
import { CreateUserBadRequestError } from "src/usesCases/user/createUser/createUserErrors";

export class UserController {
    constructor() {
        this.createUser = this.createUser.bind(this);
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
}