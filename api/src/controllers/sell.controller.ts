import { Request, Response } from "express";
import Sell from "../entity/sells.model";
import sellRepository from "../repository/sell.repository";

export default class BookController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const sell: Sell = req.body;
      const savedSell = await sellRepository.save(sell);

      res.status(201).send(savedSell);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while buying book."
      });
    }
  }

}
