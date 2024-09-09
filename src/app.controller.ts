import {
  Controller, FileTypeValidator, MaxFileSizeValidator,
  ParseFilePipe, Post, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';


@Controller()
export class AppController {
  constructor() { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => {
        cb(null, file.originalname);
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
    console.log(file);
  }
}
