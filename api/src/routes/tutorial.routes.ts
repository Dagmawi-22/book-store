import { Router } from "express";
import BookController from "../controllers/book.controller";

class BookRoutes {
  router = Router();
  controller = new BookController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Tutorial
    this.router.post("/", this.controller.create);

    // Retrieve all Tutorials
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Tutorial with id
    this.router.get("/:id", this.controller.findOne);

    // Delete a Tutorial with id
    this.router.delete("/:id", this.controller.delete);

    // Delete all Tutorials
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new BookRoutes().router;
