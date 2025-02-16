import { userRepository } from "../../../repositories";
import SigninUser from "./signinUser";

const signInUser = new SigninUser(userRepository);

export { signInUser };