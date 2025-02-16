import { err, ok, Result } from 'neverthrow';
import { encrypt, UseCase } from '../../../utils';
import { CreateUserRequestDto } from './createUserRequestDto';
import { CreateUserResponseDto } from './createUserResponseDto';
import { UnexpectedError } from '../../../utils/error';
import { User } from '../../../domain';
import { CreateUserBadRequestError } from './createUserErrors';
import { UserImplRepository } from '../../../repositories';

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
      const password = await encrypt(request.password!);
      const payload = {
        ...userOrError.value,
        password,
      }
      const result = await this.userRepository.create(payload);

      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}
