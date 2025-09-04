import { Controller, Post, Body, UseGuards, Put, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SuperAdminGuard } from 'src/auth/superadmin.guard';
import {
  AccountSummary,
  ChangePasswordDto,
  CreateAccountDto,
} from './admin.types';

@Controller('api/admin')
@UseGuards(JwtAuthGuard, SuperAdminGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('account')
  async findAllNonSuperAdmins(): Promise<AccountSummary[]> {
    return await this.adminService.getNonSuperAdminAccounts();
  }

  @Post('account')
  async create(@Body() body: CreateAccountDto): Promise<AccountSummary> {
    return this.adminService.create(body.name, body.password);
  }

  @Put('password')
  async changePassword(
    @Body() body: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.adminService.changePassword(body.id, body.password);
  }
}
