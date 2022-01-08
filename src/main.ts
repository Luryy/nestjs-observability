import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrometheusService } from './providers/prometheus/prometheus.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/((?!health))*', PrometheusService.expressPromMiddleware());
  await app.listen(3000);
}
bootstrap();
