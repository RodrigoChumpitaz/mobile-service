import { UnexpectedError } from "../../../utils/error";
import { GetUserByIdBadRequestError, GetUserByIdNotFoundError } from "./getUserByIdErrors";
import { GetUserByIdResponseDto } from "./getUserByIdResponseDto";
import { err, ok, Result } from "neverthrow";
import { UseCase } from "../../../utils";
import { GetUserByIdRequestDto } from "./getUserByIdRequestDto";
import { UserImplRepository } from "../../../repositories";

type Response = Result<GetUserByIdResponseDto, GetUserByIdNotFoundError | GetUserByIdBadRequestError | UnexpectedError>;

class GetUserById implements UseCase<GetUserByIdRequestDto, Response> {
    private userRepository: UserImplRepository;

    constructor(userRepository: UserImplRepository) {
        this.userRepository = userRepository;
    }

    async execute(request: GetUserByIdRequestDto, service?: any): Promise<Response> {
        try {
            if (request.id.length < 24) {
                return err(new GetUserByIdBadRequestError('Invalid id.'));
            }

            const user = await this.userRepository.getById(request.id);
            if (!user) {
                return err(new GetUserByIdNotFoundError());
            }
            return ok(user);
        } catch (error) {
            return err(new UnexpectedError(error));   
        }
    }
}

export default GetUserById;