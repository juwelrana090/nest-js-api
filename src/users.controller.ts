/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';

@Controller("/users")
export class UsersController {

    @Get("/profile")
    getProfile() {
        return { profile: "This is user profile" };
    }
}
