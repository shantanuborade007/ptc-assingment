import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlobService } from './blob.service';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiTags } from '@nestjs/swagger';



const multerOptions: MulterOptions = {
    dest: 'tmp/', // Set the destination for temporary uploaded files
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
  };

@Controller('images')
export class BlobController {
  constructor(private readonly blobService: BlobService) {}

  
  @Post()
  @UseInterceptors(FileInterceptor('image',multerOptions))
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    const processedImage = await this.blobService.processImage(image);
    return processedImage;
  }

  @ApiTags('blob creation')
  @Post('v1')
  @UseInterceptors(FileInterceptor('image',multerOptions))
  async uploadImage2(@UploadedFile() image: Express.Multer.File) {
    const processedImage = await this.blobService.processImage(image);
    const blob = await this.blobService.createBlob(processedImage)
    return blob;
  }


}
