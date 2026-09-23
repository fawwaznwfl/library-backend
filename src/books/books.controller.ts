import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { BooksService } from './books.service';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
  ) {}

  // CREATE
  @Post()
  create(
    @Body() createBookDto: CreateBookDto,
  ) {
    return this.booksService.create(
      createBookDto,
    );
  }

  // READ ALL
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // READ ONE
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.booksService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(
      id,
      updateBookDto,
    );
  }

  // DELETE
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.booksService.remove(id);
  }
}