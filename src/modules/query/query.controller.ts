import { Body, Controller, Post, Get, Param, Req } from '@nestjs/common';

import { QueryService } from './query.service';
import { CreateQueryRequest } from '@/modules/query/query.request';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get(':id')
  async getQuery(@Param('id') id: string, @Req() req) {
    return await this.queryService.getQuery(id, req.user?.id);
  }

  @Post()
  async createQuery(@Body() body: CreateQueryRequest) {
    return await this.queryService.createQuery(body);
  }
}
