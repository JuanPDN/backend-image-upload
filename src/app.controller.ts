import { Controller, Get, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

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
  async uploadFile(@UploadedFile(
    new ParseFilePipe({ validators: fileValidator })
  ) file: Express.Multer.File) {

    const newFile = await this.fileService.createFile(
      {
        name: file.filename,
        path: file.path
      }
    )
    return { message: "File uploaded successfully", id: newFile.id }
  }

  @Get("upload/:id")
  async getFileById(@Param("id") id: string) {
    const data = await this.fileService.getFileById({ id: Number(id) });
    if (!data) {
      return { message: `File  with id ${id} not found` }
    }
    return data
  }

  @Get("download/:filename")
  async downloadFile(@Param("filename") filename: string, @Res() res: Response) {
    res.download('./uploads/' + filename)
  }
}
