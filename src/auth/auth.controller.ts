import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/sing-up')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/sing-in')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{
        user: {
            id: number,
            username: string
        },
        accessToken: string,
        tokenType: string,
        expiresIn: string
    }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }
}
