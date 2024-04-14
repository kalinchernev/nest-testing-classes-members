import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';

describe('AppController', () => {
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            getValues: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    configService = app.get<ConfigService>(ConfigService);
  });

  describe('getHello', () => {
    it('should change accordingly with mocked values', () => {
      const getValuesSpy = jest
        .spyOn(configService, 'getValues')
        .mockReturnValue({
          appName: 'NestJS App Mocked',
          appVersion: '1.0.0',
          appDescription: 'This does not matter much',
        });

      expect(appController.getHello()).toBe(
        'Hello World from NestJS App Mocked!',
      );

      expect(getValuesSpy).toHaveBeenCalledTimes(1);
    });

    it('should change accordingly with mocked implementation', () => {
      jest.spyOn(configService, 'getValues').mockImplementation(() => ({
        appName: 'NestJS App Mocked Again',
        appVersion: '1.0.0',
        appDescription: 'This does not matter much',
      }));

      expect(appController.getHello()).toBe(
        'Hello World from NestJS App Mocked Again!',
      );
    });

    it('should work with two methods sharing the same property', () => {
      const getValuesSpy = jest
        .spyOn(configService, 'getValues')
        .mockReturnValue({
          appName: 'NestJS App Mocked',
          appVersion: '1.0.0',
          appDescription: 'This does not matter much',
        });

      expect(appController.getHello()).toBe(
        'Hello World from NestJS App Mocked!',
      );

      expect(appController.getHello2()).toBe(
        'Hello World from another method NestJS App Mocked!',
      );

      expect(getValuesSpy).toHaveBeenCalledTimes(2);
    });
  });
});
