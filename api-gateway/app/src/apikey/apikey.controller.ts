import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApikeyService } from './apikey.service';
import * as express from 'express';

@Controller('apikey')
export class ApikeyController {
    constructor(private readonly apikeyService: ApikeyService){}
    @Get("")
    generateApiKey(@Req() request: express.Request){
        const userId = (request.headers['x-user-id'] || request.headers['X-USER_ID']) as string;
        return this.apikeyService.createKey(userId);
    }
}
