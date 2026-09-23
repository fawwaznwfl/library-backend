import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './entities/book.entity';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  // CREATE
  async create(createBookDto: CreateBookDto) {
    const book =
      this.booksRepository.create(createBookDto);

    return this.booksRepository.save(book);
  }

  // READ ALL
  async findAll() {
    return this.booksRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  // READ ONE
  async findOne(id: number) {
    const book =
      await this.booksRepository.findOneBy({
        id,
      });

    if (!book) {
      throw new NotFoundException(
        `Buku dengan ID ${id} tidak ditemukan`,
      );
    }

    return book;
  }

  // UPDATE
  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ) {
    const book = await this.findOne(id);

    Object.assign(book, updateBookDto);

    return this.booksRepository.save(book);
  }

  // DELETE
  async remove(id: number) {
    const book = await this.findOne(id);

    await this.booksRepository.remove(book);

    return {
      message: 'Buku berhasil dihapus',
    };
  }
}