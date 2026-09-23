import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('books')
  export class Book {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    author: string;
  
    @Column({ unique: true })
    isbn: string;
  
    @Column()
    publishedYear: number;
  
    @Column()
    stock: number;
  
    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
  }