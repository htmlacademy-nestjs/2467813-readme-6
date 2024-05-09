/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from 'node:crypto';
import { Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

export class RequestIdInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestIdInterceptor.name);

  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const requestId = randomUUID();

    const request = context.switchToHttp().getRequest<Request>();
    request.headers['X-Request-Id'] = requestId;

    this.logger.log(
      `[${request.method}: ${request.url}]: RequestID is ${requestId}`
    );
    return next.handle();
  }
}
