import { INestApplication, ValidationPipe } from '@nestjs/common';

import { configureSwagger } from './app.swagger';
import { AppExceptionFilter } from './common/http/app-exception.filter';

interface ConfigureApplicationOptions {
  includeSwagger?: boolean;
}

export function configureApplication(
  app: INestApplication,
  options: ConfigureApplicationOptions = {},
): void {
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(app.get(AppExceptionFilter));

  if (options.includeSwagger ?? false) {
    configureSwagger(app);
  }
}
