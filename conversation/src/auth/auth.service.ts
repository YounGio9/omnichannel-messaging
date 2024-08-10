import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import rpcJson from 'src/utils/rpc-json.util';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(payload: any) {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (!foundUser) {
      throw new RpcException(rpcJson(HttpStatus.NOT_FOUND, 'User not found'));
    }

    return payload.password == foundUser.password;
  }

  async createUser(payload: Prisma.UserCreateInput) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (existingUser) {
      throw new RpcException(
        rpcJson(HttpStatus.CONFLICT, 'User already exists'),
      );
    }

    return this.prismaService.user.create({ data: payload });
  }
}
