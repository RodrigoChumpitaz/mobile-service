import { MongoProvider, UserModel } from '../../providers';
import { User } from '../../domain';
import { MainRepository } from '../mainRepository';
import { UserMap } from '../../mapper';
import { Model } from 'mongoose';
import { IUserDb } from '../../types';
import { compare } from 'bcryptjs';

class UserImplRepository extends MainRepository<User> {
  private readonly model: Model<User>;
  constructor(provider: any) {
    super(provider);
    this.model = provider.model;
  }

  async create(data: Partial<User>): Promise<User> {
    try {
      console.log('data', data);
      const result = await this.model.create(data);
      return UserMap.toDbFromDomain(result as unknown as IUserDb);
    } catch (error) {
      throw error;
    }
  }

  async signIn(data: { email: string; password: string }): Promise<any> {
    try {
      const user = await this.getByFilter({ email: data.email });
      if (!user) {
        console.log('User not found in signIn');
        return null;
      }
      const isPasswordValid = await compare(data.password, user.password!);
      return isPasswordValid ? user : null;
    } catch (error) {
      throw error;
    }
  }

  async getByFilter(filter: Record<string, any>): Promise<User | null> {
    try {
      const result = await this.model.findOne({
        ...filter
      });
      return result ? UserMap.toDbFromDomain(result as unknown as IUserDb) : null;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<User | null> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw error;
    }
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
