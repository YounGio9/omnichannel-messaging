import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { WebhookService } from './webhook.service';
import { WebhookMessage } from 'src/interfaces/webhook-message.interface';

@Controller()
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @MessagePattern('handle.webhook')
  register(@Body() payload: WebhookMessage) {
    return this.webhookService.handleWebhook(payload);
  }
}
