// src/loans/dtos/create-loan.dto.ts

export class CreateLoanDto {
  bookId: string;
  userId: string;
  loanDate: Date;
  returnDate: Date;
}
