import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception as any;
    const status = error.status;
    let message = error.message;

    if (message?.length == 0 && error.errors[0]) {
      message = error.errors[0].message;
    }
    const errorResponse = {
      statusCode: status ?? 500,
      message,
    };

    if (errorResponse.statusCode == 401) {
      response.sendStatus(401);
    } else {
      response.status(200).json(errorResponse);
    }
  }
}
