import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/books.schema';
import { Model } from 'mongoose';
import BooksGateway from './books.gateway';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private readonly booksGateway: BooksGateway,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const newBook = new this.bookModel(createBookDto);
    this.booksGateway.emitNewBook(createBookDto);
    return await newBook.save();
  }

  async findAll(page: number = 1) {
    const amountPerPage = 10;
    return await this.bookModel
      .find()
      .populate('author')
      .sort({ createdAt: -1 })
      .limit(amountPerPage)
      .skip((page - 1) * amountPerPage)
      .exec();
  }

  async findByAuthorId(author: string) {
    return await this.bookModel
      .find({ author })
      .populate('author')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    return await this.bookModel
      .findById(id)
      .populate('author')
      .exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.bookModel.findByIdAndUpdate(id, updateBookDto).exec();
    return 'Book updated';
  }

  async remove(id: string) {
    await this.bookModel.findByIdAndDelete(id).exec();
    return 'Book deleted.';
  }
}
