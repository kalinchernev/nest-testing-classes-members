import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
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
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      jest.spyOn(app.get(ConfigService), 'getValues').mockReturnValue({
        appName: 'NestJS App Mocked',
        appVersion: '1.0.0',
        appDescription: 'This does not matter much',
      });
      const appController = app.get(AppController);
      expect(appController.getHello()).toBe('Hello World from NestJS App!');
    });

    it('should change accordingly with mocked values', () => {
      jest.spyOn(app.get(ConfigService), 'getValues').mockReturnValue({
        appName: 'NestJS App Mocked',
        appVersion: '1.0.0',
        appDescription: 'This does not matter much',
      });

      const appController = app.get(AppController);

      expect(appController.getHello()).toBe(
        'Hello World from NestJS App Mocked!',
      );
    });

    it('should change accordingly with mocked implementation', () => {
      jest
        .spyOn(app.get(ConfigService), 'getValues')
        .mockImplementation(() => ({
          appName: 'NestJS App Mocked Again',
          appVersion: '1.0.0',
          appDescription: 'This does not matter much',
        }));

      const appController = app.get(AppController);

      expect(appController.getHello()).toBe(
        'Hello World from NestJS App Mocked!',
      );
    });
  });
});
