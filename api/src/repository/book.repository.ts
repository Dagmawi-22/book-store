import { OkPacket } from "mysql2";
import connection from "../db";

import Book from "../entity/book.model";

interface IBookRepository {
  save(book: Book): Promise<Book>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<Book[]>;
  retrieveById(bookId: number): Promise<Book | undefined>;
  update(book: Book): Promise<number>;
  delete(bookId: number): Promise<number>;
  deleteAll(): Promise<number>;
}


class Bookepository implements IBookRepository {
  save(book: Book): Promise<Book> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO books (title, description, discount, cover_image, price) VALUES(?,?,?)",
        [book.title, book.description, book.discount, book.cover_image, book.price],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((book) => resolve(book!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: {title?: string}): Promise<Book[]> {
    let query: string = "SELECT * FROM books";
    let condition: string = "";

    return new Promise((resolve, reject) => {
      connection.query<Book[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(bookId: number): Promise<Book> {
    return new Promise((resolve, reject) => {
      connection.query<Book[]>(
        "SELECT * FROM books WHERE id = ?",
        [bookId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(tutorial: Book): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE books SET title = ?, description = ?, published = ? WHERE id = ?",
        [tutorial.title, tutorial.description, tutorial.published, tutorial.id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(tutorialId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM books WHERE id = ?",
        [tutorialId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>("DELETE FROM books", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new Bookepository();
