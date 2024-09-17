import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('port');

  app.enableCors({ origin: "https://simple-image-uploader-jp.vercel.app" });
  await app.listen(port);
  Logger.log(`Application listening on port ${port}`);
}
bootstrap();
