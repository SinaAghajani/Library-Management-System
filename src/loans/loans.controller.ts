// src/loans/loans.controller.ts

import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dtos/create-loan.dto';
import { UpdateLoanDto } from './dtos/update-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.createLoan(createLoanDto);
  }

  @Get()
  async findAll() {
    return this.loansService.findAll();
  }

  @Patch(':id')
  async updateLoan(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.updateLoan(id, updateLoanDto);
  }

  @Patch(':id/return')
  async returnBook(@Param('id') id: string) {
    return this.loansService.returnBook(id);
  }
}
