import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { FileService } from './file/file.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, FileService],
})
export class AppModule { }
