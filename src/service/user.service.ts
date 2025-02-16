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
        this.router.get('/users/:id', this.controller.getUserById);
        this.router.post('/users/signin', this.controller.signIn);
    }
}

export default new UserService().router;