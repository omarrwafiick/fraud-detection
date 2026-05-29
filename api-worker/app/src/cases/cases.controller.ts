import { Body, Controller, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { CasesService } from './cases.service';
import { UpdateCaseDto } from './dto/updateCase.dto';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseGuards(JwtAuthGuard)
@Controller('cases')
@UseInterceptors(CacheInterceptor) 
export class CasesController {
    constructor(private readonly casesService: CasesService){}

    @Get("")
    async getFraudCasesList(){

    }

    @Patch(":id")
    async updateCase(@Param() id: number, @Body() payload: UpdateCaseDto){

    }
}
