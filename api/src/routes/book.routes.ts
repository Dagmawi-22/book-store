import { Router } from "express";
import BookController from "../controllers/book.controller";
import SellController from "../controllers/sell.controller"



class BookRoutes {
  router = Router();
  controller = new BookController();
  sellController = new SellController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Book
    this.router.post("/", this.controller.create);

    // Retrieve all Books
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Book with id
    this.router.get("/:id", this.controller.findOne);

    // Delete a Book with id
    this.router.delete("/:id", this.controller.delete);

    // Delete all Books
    this.router.delete("/", this.controller.deleteAll);

     // Buy a Book
     this.router.post("/", this.sellController.create);
  }


/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

}

export default new BookRoutes().router;
