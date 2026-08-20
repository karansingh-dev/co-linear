import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(env.apiPrefix);
  app.enableCors({
    origin: env.corsOrigins,
    credentials: true,
  });

  console.log(env.port)

  await app.listen(env.port, env.host);
}
bootstrap();
