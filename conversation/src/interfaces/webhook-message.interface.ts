import { Channel } from '@prisma/client';

export interface WebhookMessage {
  messageId: string;

  senderId: string;

  senderName: string;

  channel: Channel;

  content: string;
}
