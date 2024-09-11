import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, File } from '@prisma/client';

@Injectable()
export class FileService {
    constructor(private prisma: PrismaService) { }

    async createFile(data: Prisma.FileCreateInput): Promise<File> {
        return this.prisma.file.create({ data })
    }

    async getFileById(fileWhereUniqueInput: Prisma.FileWhereUniqueInput)
        : Promise<File | null> {
        return this.prisma.file.findUnique({ where: fileWhereUniqueInput })
    }
}
