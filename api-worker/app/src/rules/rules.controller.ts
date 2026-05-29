import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { RulesService } from './rules.service';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { CreateRuleDto } from './dtos/createRule.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseGuards(JwtAuthGuard)
@Controller('rules')
@UseInterceptors(CacheInterceptor)
export class RulesController {
    constructor(private readonly rulesService: RulesService){}

    @Post("")
    async createRule(@Body() payload: CreateRuleDto){

    }

    @Get("")
    async getRules(){

    }
}
