import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('live')
  getLiveness() {
    return {
      status: 'ok',
      probe: 'liveness',
      service: 'backend',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  getReadiness() {
    return {
      status: 'ok',
      probe: 'readiness',
      service: 'backend',
      timestamp: new Date().toISOString(),
    };
  }
}
