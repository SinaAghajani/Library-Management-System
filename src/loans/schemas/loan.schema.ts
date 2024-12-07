// src/loans/schemas/loan.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Loan extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: string;

  @Prop({ default: Date.now })
  loanDate: Date;

  @Prop()
  returnDate: Date;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
