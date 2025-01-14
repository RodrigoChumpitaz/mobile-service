import Joi from "joi";
import { IUserProps } from "./user";
import { UserRole } from "../../types";

const userValidationSchema = Joi.object<IUserProps>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(...Object.values(UserRole)).optional().default(UserRole.USER)
})

const validateUser = (user: IUserProps) => {
    return userValidationSchema.validate(user, { abortEarly: false });
}

export { validateUser };