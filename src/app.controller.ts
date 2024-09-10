import { Controller, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from './file/file.service';
import { storage, fileFilter, fileValidator } from './helpers/file.helper';

@Controller()
export class AppController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
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
  }
}


