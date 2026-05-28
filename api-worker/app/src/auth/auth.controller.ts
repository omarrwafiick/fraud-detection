import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsUserGuard } from './guards/isUser.guard';
import { LoginUserDto } from './dtos/login.dto';
import { SignUpUserDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("login")
    async login(@Body() payload: LoginUserDto){

    }

    @Post("signup")
    async signup(@Body() payload: SignUpUserDto){

    }

    @Get("refresh")
    async refresh(){

    }

    @Post("logout")
    logout(){

    }

    @Get("api-key")
    @UseGuards(IsUserGuard)
    async generateApiKey(){

    }
}
