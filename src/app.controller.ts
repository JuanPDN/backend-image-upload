import {
  Controller, FileTypeValidator, MaxFileSizeValidator,
  ParseFilePipe, Post, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file/file.service';

@Controller()
export class AppController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => {
        cb(null, new Date().getTime() + "_" + file.originalname);
      }
    })
  }))
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
        new FileTypeValidator({ fileType: "image/*" })
      ]
    })
  ) file: Express.Multer.File) {
    return this.fileService.createFile(
      {
        name: file.filename,
        path: file.path
      }
    )
  }
}


