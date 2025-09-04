import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountService } from './account.service';
import { CreateClientDto, CreateItemDto } from './account.types';

@Controller('api/account')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('clients')
  async getClients(@Req() req) {
    const accountId: number = req.user.sub;
    return this.accountService.getClients(accountId);
  }

  @Post('client')
  async createClient(@Req() req, @Body() body: CreateClientDto) {
    const accountId: number = req.user.sub;
    return this.accountService.createClient(accountId, body.name);
  }

  @Get('items')
  async getItems(@Req() req) {
    const accountId: number = req.user.sub;
    return this.accountService.getItems(accountId);
  }

  @Post('item')
  async createItem(@Req() req, @Body() body: CreateItemDto) {
    const accountId: number = req.user.sub;
    return this.accountService.createItem(accountId, body.name, body.price);
  }
}
