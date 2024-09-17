import { Controller, Get, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { FileService } from './file/file.service';
import { fileFilter, fileValidator } from './helpers/file.helper';
import { CloudinaryService } from './cloudinary/cloudinary.service';


@Controller()
export class AppController {
  constructor(private readonly fileService: FileService,
    private readonly cloudinaryService: CloudinaryService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 2 },
  }))
  async uploadFile(@UploadedFile(
    new ParseFilePipe({ validators: fileValidator })
  ) file: Express.Multer.File) {

    const data = await this.cloudinaryService.uploadFile(file)
    const newFile = await this.fileService.createFile(
      {
        name: data.display_name, path: data.url
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

    const file = await this.fileService.getFileByName({ name: filename })
    if (!file || !file.path) return res.send({ message: "File not found" });

    const fileUrl = this.cloudinaryService.getImageAttachment(file.name)

    res.redirect(fileUrl)

  }
}
