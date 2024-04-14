import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  values: any;

  constructor(private readonly configService: ConfigService) {
    this.values = this.configService.getValues();
  }

  getHello(): string {
    return `Hello World from ${this.values.appName}!`;
  }

  getHello2(): string {
    return `Hello World from another method ${this.values.appName}!`;
  }
}
