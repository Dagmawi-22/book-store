import { Application } from "express";
import bookRoutes from "./book.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/books", bookRoutes);
  }
}
