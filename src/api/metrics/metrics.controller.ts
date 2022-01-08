import { Controller, Get } from '@nestjs/common';

import { MetricsService } from './metrics.service';

import { PrometheusService } from '@/providers/prometheus/prometheus.service';

@Controller('metrics')
export class MetricsController {
  constructor(
    private metricsService: MetricsService,
    private promClientService: PrometheusService,
  ) {}

  @Get()
  public metrics(): Promise<string> {
    return this.metricsService.metrics;
  }

  @Get('/gauge')
  gauge(): any {
    const gouge = this.promClientService.registerGauge('test', 'testt');
    gouge.inc(1);
    return { metrics: 'Gauge' };
  }

  @Get('/counter')
  counter(): any {
    const count = this.promClientService.registerCounter('count', 'help');
    count.inc(1);
    return { metrics: 'Counter' };
  }
}
