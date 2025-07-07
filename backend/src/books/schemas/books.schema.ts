import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Author } from "src/authors/schemas/authors.schema";

@Schema({collection: 'books'})
export class Book {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    releasedAt: Date;

    @Prop({default: Date.now})
    createdAt: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Author'})
    author: Author
}

export const BookSchema = SchemaFactory.createForClass(Book);