import { Injectable } from '@nestjs/common';

import { PrometheusService } from '@/providers/prometheus/prometheus.service';

@Injectable()
export class MetricsService {
  constructor(private promClientService: PrometheusService) {}
  get metrics(): Promise<string> {
    return this.promClientService.metrics;
  }
}
