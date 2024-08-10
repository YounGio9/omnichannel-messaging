import { ApiHideProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

enum Channel {
  whatsapp = 'whatsapp',
  messenger = 'messenger',
  sms = 'sms',
  telegram = 'telegram',
}

export class WebhookMessageDto {
  messageId: string;

  senderId: string;

  senderName: string;

  @ApiHideProperty()
  @IsOptional()
  channel: string;
}

export class WebhookParamDto {
  @IsEnum(Channel)
  channel: Channel;
}
