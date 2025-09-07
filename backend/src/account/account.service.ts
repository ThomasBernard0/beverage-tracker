import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Client, Item, Order } from '@prisma/client';
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
        orderBy: {
          name: 'asc',
        },
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
        orderBy: {
          name: 'asc',
        },
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

  async createOrder(
    accountId: number,
    itemName: string,
    priceInCent: number,
    clientId: string,
  ): Promise<Order> {
    const client = await this.getClientById(clientId);
    if (!client) throw new NotFoundException('Client not found');
    this.verifyAccountOwnership(accountId, client.accountId);
    try {
      return this.prisma.order.create({
        data: {
          itemName,
          priceInCent,
          clientId,
          isPayed: false,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create client');
    }
  }

  async deleteOrder(accountId: number, orderId: string) {
    const order = await this.getOrderById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    const client = await this.getClientById(order.clientId);
    if (!client) throw new NotFoundException('Client not found');
    this.verifyAccountOwnership(accountId, client.accountId);
    try {
      await this.prisma.order.delete({
        where: { id: orderId },
      });
      return { message: 'Order deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Failed to delete order');
    }
  }

  async getUnpaidOrdersByClient(
    accountId: number,
  ): Promise<{ id: string; name: string; orders: Order[] }[]> {
    return this.prisma.client.findMany({
      where: {
        accountId,
        orders: {
          some: { isPayed: false },
        },
      },
      select: {
        id: true,
        name: true,
        orders: {
          where: { isPayed: false },
        },
      },
    });
  }

  async payOrder(accountId: number, clientId: string): Promise<Order[]> {
    const client = await this.getClientById(clientId);
    if (!client) throw new NotFoundException('Client not found');
    this.verifyAccountOwnership(accountId, client.accountId);
    try {
      const unpaidOrders = await this.prisma.order.findMany({
        where: {
          clientId,
          isPayed: false,
        },
      });
      if (unpaidOrders.length === 0) return [];

      await this.prisma.order.updateMany({
        where: {
          clientId,
          isPayed: false,
        },
        data: {
          isPayed: true,
        },
      });
      return unpaidOrders.map((order) => ({ ...order, isPayed: true }));
    } catch {
      throw new BadRequestException('Failed to pay order');
    }
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({ where: { id } });
  }
}
