import { Injectable } from '@nestjs/common';

import { DateTimeProvider } from './date-time-provider';

@Injectable()
export class SystemDateTimeProviderService implements DateTimeProvider {
  now(): Date {
    return new Date();
  }
}
