import { err, ok, Result } from "neverthrow";
import { UnexpectedError } from "../../../utils/error";
import { ramdonString, UseCase } from "../../../utils";
import { SigninUserRequestDto } from "./signinUserRequestDto";
import { SigninUserResponseDto } from "./signinUserResponseDto";
import { SigninUserBadRequestError, SigninUserEmailNotFoundError } from "./signinUserErrors";
import { UserImplRepository } from "../../../repositories";

type Response = Result<SigninUserResponseDto, SigninUserBadRequestError | SigninUserEmailNotFoundError | UnexpectedError>;

class SigninUser implements UseCase<SigninUserRequestDto, Response>{
    private userRepository: UserImplRepository;
    constructor(userRepo: UserImplRepository){
        this.userRepository = userRepo
    }
    async execute(request: SigninUserRequestDto, service?: any): Promise<Response> {
        try {
            const { email, password } = request;
            const userByEmail = await this.userRepository.getByFilter({
                email
            });
            if(!userByEmail) {
                return err(new SigninUserEmailNotFoundError());
            }

            const isPasswordValid = await this.userRepository.signIn({ email, password });
            if (!isPasswordValid) {
                return err(new SigninUserBadRequestError('Invalid credentials.'));
            }

            return ok({
                expiresIn: new Date().getTime() + 3600,
                token: ramdonString(35)
            })
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default SigninUser;