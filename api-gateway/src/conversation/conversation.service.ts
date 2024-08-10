import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from 'src/dto/register.dto';
import { WebhookMessageDto } from 'src/dto/webhook-message.dto';

@Injectable()
export class ConversationService {
  constructor(
    @Inject('CONVERSATION_SERVICE')
    private readonly conversationClient: ClientProxy,
  ) {}

  register(payload: RegisterDto) {
    return this.conversationClient.send('register', payload);
  }

  async validateUser(username: string, password: string) {
    return this.conversationClient.send('validate.user', {
      username,
      password,
    });
  }

  handleWebhook(payload: WebhookMessageDto) {
    return this.conversationClient.send('handle.webhook', payload);
  }
}
