import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
 const config = new DocumentBuilder()
    .setTitle('Monolithic Architure Api')
    .setDescription('Api Description')
    .setVersion('1.0')
    .build()
 
 const document = SwaggerModule.createDocument(app,config)
 SwaggerModule.setup('api',app,document);
 
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
