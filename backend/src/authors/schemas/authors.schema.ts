import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({collection:'authors'})
export class Author {
    @Prop({required: true})
    firstName: string;
    
    @Prop({required: true})
    lastName: string;

    @Prop({default: Date.now})
    createdAt: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);