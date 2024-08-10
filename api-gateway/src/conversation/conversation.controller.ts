import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConversationService } from './conversation.service';
import { RegisterDto } from 'src/dto/register.dto';
import {
  WebhookMessageDto,
  WebhookParamDto,
} from 'src/dto/webhook-message.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('')
@ApiBasicAuth()
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('register')
  @ApiResponse({ status: 409, description: 'User exists' })
  @ApiOperation({ description: 'Register a new agent account' })
  @HttpCode(HttpStatus.CREATED)
  register(@Body() payload: RegisterDto) {
    return this.conversationService.register(payload);
  }

  @Post('webhook/:channel')
  @ApiOperation({ description: 'Register a new agent account' })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  webhook(
    @Param() params: WebhookParamDto,
    @Body() payload: WebhookMessageDto,
  ) {
    return this.conversationService.handleWebhook({
      ...payload,
      channel: params.channel,
    });
  }
}
