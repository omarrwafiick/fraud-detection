import { Body, Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { ApiKeyGuard } from './guards/ApiKey.guard';
import { IngestTransactionDto } from './dtos/ingestTransaction.dto';
import { ApiService } from '../api/api.service';
import * as express from 'express';

@Controller('ingestion')
export class IngestionController {
    constructor(
        private readonly ingestionService: IngestionService, 
        private readonly apiService: ApiService,
    ){}

    @Post("transaction")
    @UseGuards(ApiKeyGuard)
    async makeTransaction(@Body() payload: IngestTransactionDto){
       await this.ingestionService.processTransaction(payload); 
    }

    @Post("transaction/sync-check")
    @UseGuards(ApiKeyGuard)
    async syncCheckTransaction(
        @Request() request: express.Request, 
        @Response() response: express.Response, 
        @Body() payload: IngestTransactionDto){
        return await this.apiService.handleRerouting('POST', request, response);
    }
}
