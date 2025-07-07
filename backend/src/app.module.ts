import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
  imports: [AuthorsModule, MongooseModule.forRoot('mongodb://mongo:27017/library'), BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
