import { Body, Controller, UseGuards ,Post,Req, Param, ParseIntPipe, Get, UploadedFile, UseInterceptors} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { JobDto } from 'src/auth/dto/jobdto';
import { BlobService } from 'src/blob/blob.service';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
const {ObjectId} = require('mongodb');


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



@Controller('worker')
export class WorkerController {
    constructor(private readonly workerService:WorkerService,
                private readonly blobService:BlobService
    ){}

    @ApiTags('demo-api for job creation')
    @UseGuards(JwtAuthGuard)
    @Post('create-job')
    async createJob(@Body() jobDto :JobDto,@Req() req:Request){
        // console.log(body)
        console.log("Im here buddy in create Job function !")
        const user = req.user as User;
        return this.workerService.createJob(user,jobDto)
    }

    @ApiTags('create job')
    @UseGuards(JwtAuthGuard)
    @Post('api/v1/job')
    @UseInterceptors(FileInterceptor('image',multerOptions))
    async createJobWithImage(@UploadedFile() image: Express.Multer.File , status:string,@Req() req:Request){
        const processedImage = await this.blobService.processImage(image);
        console.log('working 1')
        const blob = await this.blobService.createBlob(processedImage)

        const imgURL = new ObjectId(blob.id)
        const jobDto = {imgURL,status}
        const user = req.user as User;
        return this.workerService.createJob(user,jobDto)
    }

    // @UseGuards(JwtAuthGuard)
    @ApiTags('Get Job By id')
    @Get('job/:id')
    async findJobById(@Param('id') id:string){
        return this.workerService.findByid(id);
    }

    @ApiTags('job status')
    @Get('job/:id/status')
    async findJobStatus(@Param('id') id:string){
        return this.workerService.findJobStatus(id);
    }
}
