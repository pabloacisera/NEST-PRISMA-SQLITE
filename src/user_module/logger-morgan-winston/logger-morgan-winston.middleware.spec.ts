import { LoggerMorganWinstonMiddleware } from './logger-morgan-winston.middleware';

describe('LoggerMorganWinstonMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerMorganWinstonMiddleware()).toBeDefined();
  });
});
