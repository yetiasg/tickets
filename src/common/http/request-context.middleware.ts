import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { IdGenerator } from '../../core/id-generator/id-generator';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly idGenerator: IdGenerator) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const traceId = request.header('x-trace-id') ?? this.idGenerator.generate();
    const correlationId = request.header('x-correlation-id') ?? traceId;

    request.headers['x-trace-id'] = traceId;
    request.headers['x-correlation-id'] = correlationId;
    response.setHeader('x-trace-id', traceId);
    response.setHeader('x-correlation-id', correlationId);

    next();
  }
}
