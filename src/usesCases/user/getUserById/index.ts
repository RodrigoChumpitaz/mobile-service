import { userRepository } from "../../../repositories";
import GetUserById from "./getUserById";

const getUserById = new GetUserById(userRepository);

export { getUserById };