import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schemas/authors.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private productModel: Model<Author>) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = new this.productModel(createAuthorDto);
    return await newAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.productModel.findById(id).exec();
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found.`);
    }
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return await this.productModel
      .findByIdAndUpdate(id, updateAuthorDto)
      .exec();
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}
