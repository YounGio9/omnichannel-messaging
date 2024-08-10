import { Injectable } from '@nestjs/common';
import { WebhookMessage } from 'src/interfaces/webhook-message.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WebhookService {
  constructor(private readonly prismaService: PrismaService) {}

  async handleWebhook(payload: WebhookMessage) {
    const chat = await this.prismaService.chat.findFirst({
      where: {
        customerId: payload.senderId,
        channel: payload.channel,
        status: 'OPEN',
      },
    });

    if (chat) {
      await this.prismaService.message.create({
        data: {
          chatId: chat.id,
          senderId: payload.senderId,
          senderType: 'CUSTOMER',
          content: payload.content,
        },
      });
    }

    return payload;
  }
}
