import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseGuards(JwtAuthGuard)
@Controller('tenant')
@UseInterceptors(CacheInterceptor) 
export class TenantController {
    constructor(private readonly tenantService: TenantService){}

    @Get("profile")
    async getProfile(){

    }
}
