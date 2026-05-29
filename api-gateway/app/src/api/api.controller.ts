import { Controller, All, Req, Res } from '@nestjs/common';
import * as express from 'express';
import { ApiService, AllowedMethods } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @All(':version/*path')
  async handleIncomingRequests(
    @Req() req: express.Request,
    @Res() res: express.Response,
  ) {
    const method = req.method as AllowedMethods;
    return await this.apiService.handleRerouting(method, req, res);
  }
}