import { Module } from '@nestjs/common';

import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

import { PrometheusModule } from '@/providers/prometheus/prometheus.module';

@Module({
  imports: [PrometheusModule],
  providers: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
