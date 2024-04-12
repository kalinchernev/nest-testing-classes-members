import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            getValues: () => ({
              appName: 'NestJS App',
              appVersion: '1.0.0',
              appDescription: 'This does not matter much',
            }),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('getHello', () => {
    it('should return a string', () => {
      const result = appService.getHello();
      expect(typeof result).toBe('string');
    });
  });
});
