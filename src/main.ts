import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes';
import { EnvConfigService } from './config/env-config/env-config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = app.get(EnvConfigService).getAppPort();
  await app.listen(port);
}
bootstrap();

