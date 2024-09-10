import { FileTypeValidator, MaxFileSizeValidator } from "@nestjs/common";
import { diskStorage } from "multer";

export const fileName = (_, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    return cb(null, new Date().getTime() + "_" + file.originalname);
}

export const fileFilter = (_, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg|ico|jfif|tiff|bmp|avif|heic|heif)$/)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }

    if (file.size > 1024 * 1024 * 2) {
        cb(new Error('File is too large!'), false);
    }
}

export const fileValidator = [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
    new FileTypeValidator({ fileType: "image/*" })
]

export const storage = diskStorage({
    destination: './uploads',
    filename: fileName
})