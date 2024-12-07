import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI), 
    AuthModule,
    UsersModule,
    BooksModule,
    LoansModule,
  ],
})
export class AppModule {}
