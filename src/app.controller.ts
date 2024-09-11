import { Controller, Get, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from './file/file.service';
import { storage, fileFilter, fileValidator } from './helpers/file.helper';
import { join } from 'path';

@Controller('upload')
export class AppController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: storage
  }))
  uploadFile(@UploadedFile(
    new ParseFilePipe({ validators: fileValidator })
  ) file: Express.Multer.File) {

    file && this.fileService.createFile(
      {
        name: file.originalname,
        path: file.path
      }
    )
    return { message: "File uploaded successfully" }
  }

  @Get("/:id")
  async getFileById(@Param("id") id: string) {
    const data = await this.fileService.getFileById({ id: Number(id) });
    if (!data) {
      return { message: `File  with id ${id} not found` }
    }
    return data
  }
}


