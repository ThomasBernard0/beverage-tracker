import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Client, Item } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  verifyAccountOwnership(requestAccountId: number, resourceAccountId: number) {
    if (requestAccountId !== resourceAccountId) {
      throw new ForbiddenException('You do not have access to this resource');
    }
  }

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
      throw new BadRequestException('Failed to create client');
    }
  }

  async deleteClient(accountId: number, clientId: string) {
    const client = await this.getClientById(clientId);
    if (!client) throw new NotFoundException('Client not found');
    this.verifyAccountOwnership(accountId, client.accountId);
    try {
      await this.prisma.client.delete({
        where: { id: clientId },
      });

      return { message: 'Client deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Failed to delete client');
    }
  }

  async getClientById(id: string): Promise<Client | null> {
    return this.prisma.client.findUnique({ where: { id } });
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
      throw new BadRequestException('Failed to create item');
    }
  }

  async deleteItem(accountId: number, itemId: string) {
    const item = await this.getItemById(itemId);
    if (!item) throw new NotFoundException('Item not found');
    this.verifyAccountOwnership(accountId, item.accountId);
    try {
      await this.prisma.item.delete({
        where: { id: itemId },
      });

      return { message: 'Item deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Failed to delete item');
    }
  }

  async getItemById(id: string): Promise<Client | null> {
    return this.prisma.item.findUnique({ where: { id } });
  }
}
