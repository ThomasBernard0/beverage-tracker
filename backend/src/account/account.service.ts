import { BadRequestException, Injectable } from '@nestjs/common';
import { Client, Item } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async getClients(accountId: number): Promise<Client[]> {
    try {
      return await this.prisma.client.findMany({
        where: { accountId },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch clients');
    }
  }

  async createClient(accountId: number, name: string): Promise<Client> {
    try {
      return this.prisma.client.create({
        data: {
          name,
          accountId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch active session');
    }
  }

  async getItems(accountId: number): Promise<Item[]> {
    try {
      return await this.prisma.item.findMany({
        where: { accountId },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch items');
    }
  }

  async createItem(
    accountId: number,
    name: string,
    priceInCent: number,
  ): Promise<Item> {
    try {
      return this.prisma.item.create({
        data: {
          name,
          priceInCent,
          accountId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch active session');
    }
  }
}
