import { Injectable } from '@nestjs/common';
import expressPromBundle from 'express-prom-bundle';
import promClient, {
  Registry,
  collectDefaultMetrics,
  Histogram,
  Gauge,
  Counter,
} from 'prom-client';

export type PrometheusHistogram = Histogram<string>;

interface MapHistogram {
  [key: string]: Histogram<string>;
}

interface MapGauge {
  [key: string]: Gauge<string>;
}

interface MapCounter {
  [key: string]: Counter<string>;
}

@Injectable()
export class PrometheusService {
  private readonly serviceTitle = 'Nest-Observability';
  private readonly servicePrefix = 'Observability_';
  private registeredMetrics: MapHistogram = {};
  private registeredGauges: MapGauge = {};
  private registeredCounters: MapCounter = {};
  private readonly registry: Registry;

  constructor() {
    this.registry = promClient.register;
    this.registry.setDefaultLabels({
      app: this.serviceTitle,
    });
    collectDefaultMetrics();
  }

  public get metrics(): Promise<string> {
    return this.registry.metrics();
  }

  public registerMetrics(
    name: string,
    help: string,
    labelNames: string[],
    buckets: number[],
  ): Histogram<string> {
    if (this.registeredMetrics[name] === undefined) {
      const histogram = new Histogram({ name, help, labelNames, buckets });
      this.registeredMetrics[name] = histogram;
    }
    return this.registeredMetrics[name];
  }

  public registerGauge(name: string, help: string): Gauge<string> {
    if (this.registeredGauges[name] === undefined) {
      const gauge = (this.registeredGauges[name] = new Gauge({
        name: this.servicePrefix + name,
        help,
      }));
      this.registeredGauges[name] = gauge;
    }
    return this.registeredGauges[name];
  }

  public registerCounter(name: string, help: string): Counter<string> {
    if (this.registeredCounters[name] === undefined) {
      const gauge = (this.registeredCounters[name] = new Counter({
        name: this.servicePrefix + name,
        help,
      }));
      this.registeredCounters[name] = gauge;
    }
    return this.registeredCounters[name];
  }

  public removeSingleMetric(name: string): void {
    return this.registry.removeSingleMetric(name);
  }

  public clearMetrics(): void {
    this.registry.resetMetrics();
    return this.registry.clear();
  }

  static expressPromMiddleware() {
    return expressPromBundle({
      includePath: true,
      includeMethod: true,
      autoregister: false,
      buckets: [0.5, 1, 2, 3, 5, 7],
      httpDurationMetricName: `_http_request_duration_seconds`,
    });
  }
}
