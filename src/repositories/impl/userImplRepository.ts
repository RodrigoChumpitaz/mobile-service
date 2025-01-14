import { MongoProvider, UserModel } from '../../providers';
import { User } from '../../domain';
import { MainRepository } from '../mainRepository';
import { UserMap } from 'src/mapper';

class UserImplRepository extends MainRepository<User> {
  constructor(provider: any) {
    super(provider);
  }

  async create(data: Partial<User>): Promise<User> {
    try {
      const result = await this.provider.create(data);
      return UserMap.toDbFromDomain(result);
    } catch (error) {
      throw error;
    }
  }
  getById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<User>): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(query?: Record<string, any>): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}

const mongoProvider = new MongoProvider<User>(UserModel);
const userRepository = new UserImplRepository(mongoProvider);

export { userRepository, UserImplRepository };
