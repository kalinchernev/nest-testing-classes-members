import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getValues() {
    return {
      appName: 'NestJS App',
      appVersion: '1.0.0',
      appDescription: 'This does not matter much',
    };
  }
}
