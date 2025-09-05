import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountService } from './account.service';
import {
  CreateClientDto,
  CreateItemDto,
  CreateOrderDto,
  PayOrderDto,
} from './account.types';

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

  @Delete('client/:id')
  async deleteClient(@Req() req, @Param('id') clientId: string) {
    const accountId: number = req.user.sub;
    return this.accountService.deleteClient(accountId, clientId);
  }

  @Get('items')
  async getItems(@Req() req) {
    const accountId: number = req.user.sub;
    return this.accountService.getItems(accountId);
  }

  @Post('item')
  async createItem(@Req() req, @Body() body: CreateItemDto) {
    const accountId: number = req.user.sub;
    return this.accountService.createItem(
      accountId,
      body.name,
      body.priceInCent,
    );
  }

  @Delete('item/:id')
  async deleteItem(@Req() req, @Param('id') clientId: string) {
    const accountId: number = req.user.sub;
    return this.accountService.deleteItem(accountId, clientId);
  }

  @Post('order')
  async createOrder(@Req() req, @Body() body: CreateOrderDto) {
    const accountId: number = req.user.sub;
    return this.accountService.createOrder(
      accountId,
      body.itemName,
      body.priceInCent,
      body.clientId,
    );
  }

  @Delete('order/:id')
  async deleteOrder(@Req() req, @Param('id') orderId: string) {
    const accountId: number = req.user.sub;
    return this.accountService.deleteOrder(accountId, orderId);
  }

  @Get('orders/unpaid')
  async getUnpaidOrdersByClient(@Req() req) {
    const accountId: number = req.user.sub;
    return this.accountService.getUnpaidOrdersByClient(accountId);
  }

  @Put('orders/pay')
  async payOrder(@Req() req, @Body() body: PayOrderDto) {
    const accountId: number = req.user.sub;
    return this.accountService.payOrder(accountId, body.clientId);
  }
}
