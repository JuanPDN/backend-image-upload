import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static'

import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { FileService } from './file/file.service';
import { join } from 'path';



@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads'
  })],
  controllers: [AppController],
  providers: [PrismaService, FileService],
})
export class AppModule { }
