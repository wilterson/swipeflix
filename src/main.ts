import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ModelNotFoundExceptionFilter } from './exception-filters/model-not-found.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ModelNotFoundExceptionFilter());

  app.setGlobalPrefix('api/v1');

  await app.listen(3003);

  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);
  console.log(availableRoutes);
}
bootstrap();
