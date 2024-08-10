import { Injectable } from '@nestjs/common';
import { WebhookMessage } from 'src/interfaces/webhook-message.interface';

@Injectable()
export class WebhookService {
  async handleWebhook(payload: WebhookMessage) {
    console.log(payload);
    return payload;
  }
}
