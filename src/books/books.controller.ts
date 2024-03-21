import { Controller, Logger } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
  private readonly logger = new Logger(BooksController.name);
  constructor(private readonly bookService: BooksService) {}
}
