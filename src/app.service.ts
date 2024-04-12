import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  appName: string;

  constructor(private readonly configService: ConfigService) {
    this.appName = this.configService.getValues().appName;
  }

  getHello(): string {
    return `Hello World from ${this.appName}!`;
  }
}
