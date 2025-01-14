import { err, ok, Result } from 'neverthrow';
import { UseCase } from '../../../utils';
import { CreateUserRequestDto } from './createUserRequestDto';
import { CreateUserResponseDto } from './createUserResponseDto';
import { UnexpectedError } from 'src/utils/error';
import { User } from 'src/domain';
import { CreateUserBadRequestError } from './createUserErrors';
import { UserImplRepository } from 'src/repositories';

type Response = Result<CreateUserResponseDto, CreateUserBadRequestError | UnexpectedError>;

export class CreateUser implements UseCase<CreateUserRequestDto, Response> {
  private userRepository: UserImplRepository;

  constructor(userRepository: UserImplRepository) {
    this.userRepository = userRepository;
  }

  async execute(request: CreateUserRequestDto, service?: any): Promise<Response> {
    try {
      const userOrError = User.create(request);

      if (!userOrError.isOk()) {
        return err(new CreateUserBadRequestError(userOrError.error));
      }

      const result = await this.userRepository.create(userOrError.value);

      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}
