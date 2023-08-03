import { OkPacket } from "mysql2";
import connection from "../db";

import Book from "../models/book.model";

interface ITutorialRepository {
  save(tutorial: Book): Promise<Book>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<Book[]>;
  retrieveById(tutorialId: number): Promise<Book | undefined>;
  update(tutorial: Book): Promise<number>;
  delete(tutorialId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class TutorialRepository implements ITutorialRepository {
  save(tutorial: Book): Promise<Book> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO tutorials (title, description, published) VALUES(?,?,?)",
        [tutorial.title, tutorial.description, tutorial.published ? tutorial.published : false],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((tutorial) => resolve(tutorial!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Book[]> {
    let query: string = "SELECT * FROM tutorials";
    let condition: string = "";

    if (searchParams?.published)
      condition += "published = TRUE"

    if (searchParams?.title)
      condition += `LOWER(title) LIKE '%${searchParams.title}%'`

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Book[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(tutorialId: number): Promise<Book> {
    return new Promise((resolve, reject) => {
      connection.query<Book[]>(
        "SELECT * FROM tutorials WHERE id = ?",
        [tutorialId],
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
        "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
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
        "DELETE FROM tutorials WHERE id = ?",
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
      connection.query<OkPacket>("DELETE FROM tutorials", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new TutorialRepository();
