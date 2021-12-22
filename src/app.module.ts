import { Module } from '@nestjs/common';
import { HelloWorldModule } from './api/hello-world/hello-world.module';

@Module({
  imports: [HelloWorldModule],
  controllers: [],
  providers: [],
})
export class AppModule {}