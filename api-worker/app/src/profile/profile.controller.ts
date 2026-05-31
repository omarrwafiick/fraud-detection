import { Controller, Get, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import * as express from 'express';
import { User } from 'src/auth/entities/user.entity';
import { IUser } from 'src/auth/interfaces/user.interface';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
    ){}

    @Get("")
    async getProfile(
        @Req() request: express.Request,
    ){
        const userId = (request.user as IUser).id;
        return this.profileService.getProfile(userId);
    }
}
