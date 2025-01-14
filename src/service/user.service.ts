import { Router } from "express";
import { UserController } from "../controller/user.controller";

class UserService {
    router: Router;
    controller: UserController;

    constructor() {
        this.router = Router();
        this.controller = new UserController()
        this.routes();
    }

    routes() {
        this.router.post('/users', this.controller.createUser);
    }
}

export default new UserService().router;