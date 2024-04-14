import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    const values = this.configService.getValues();
    return `Hello World from ${values.appName}!`;
  }

  getHello2(): string {
    const values = this.configService.getValues();
    return `Hello World from another method ${values.appName}!`;
  }
}
