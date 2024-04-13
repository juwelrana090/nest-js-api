import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

export class UserRepository extends Repository<User> {
  // get all user
  // add user
  // get user
  // delete user
  // update user
  
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    return user;
  }
}