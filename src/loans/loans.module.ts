// src/loans/loans.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { Loan, LoanSchema } from './schemas/loan.schema';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    BooksModule,
    UsersModule,
  ],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
