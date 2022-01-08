import { Module } from '@nestjs/common';
import { HelloWorldModule } from './api/hello-world/hello-world.module';
import { MetricsModule } from './api/metrics/metrics.module';
import { PrometheusModule } from './providers/prometheus/prometheus.module';

@Module({
  imports: [HelloWorldModule, PrometheusModule, MetricsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
