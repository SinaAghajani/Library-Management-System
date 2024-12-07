// src/loans/loans.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan } from './schemas/loan.schema';
import { CreateLoanDto } from './dtos/create-loan.dto';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { UpdateLoanDto } from './dtos/update-loan.dto';

@Injectable()
export class LoansService {
  [x: string]: any;
  constructor(
    @InjectModel(Loan.name) private loanModel: Model<Loan>,
    private booksService: BooksService,
    private usersService: UsersService,
  ) { }

  async createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
    const { bookId, userId } = createLoanDto;

    const book = await this.booksService.findOne(bookId);
    if (!book) throw new NotFoundException(`Book with ID ${bookId} not found`);

    const user = await this.usersService.findByUsername(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const existingLoan = await this.loanModel.findOne({ bookId, returnDate: null }).exec();
    if (existingLoan) throw new BadRequestException('This book is already loaned out');

    const loan = new this.loanModel(createLoanDto);
    return loan.save();
  }

  async updateLoan(id: string, updateLoanDto: UpdateLoanDto): Promise<Loan> {
    const updatedLoan = await this.loanModel
      .findByIdAndUpdate(id, updateLoanDto, { new: true })
      .exec();

    if (!updatedLoan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    return updatedLoan;
  }


  async findAll(): Promise<Loan[]> {
    return this.loanModel.find().populate('bookId').populate('userId').exec();
  }

  async returnBook(id: string): Promise<Loan> {
    const loan = await this.loanModel.findById(id).exec();
    if (!loan) throw new NotFoundException(`Loan with ID ${id} not found`);

    loan.returnDate = new Date();
    return loan.save();
  }
}
