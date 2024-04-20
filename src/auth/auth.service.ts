import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        // const exists = this.userRepository.findOne({ where: { username } });

        // if (exists) {
        //     throw new Error('Username already exists');
        // }
        const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);

        console.log(user)

        try {
            // await user.save();
            // return user;
        } catch (error) {
            // console.log(error.code);
            if (error.code === '23505') {
                // throw new Error('Username already exists');
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}
