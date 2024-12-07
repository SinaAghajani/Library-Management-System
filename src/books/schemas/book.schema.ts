// src/books/schemas/book.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  category: string;

  @Prop({ default: true })
  available: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
