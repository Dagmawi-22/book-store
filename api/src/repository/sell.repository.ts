import { OkPacket } from "mysql2";
import connection from "../db";

import Sell from "../entity/sells.model";

interface ISellRepository {
  save(sell: Sell): Promise<Sell>;
}


class SellRepository implements ISellRepository {
  save(sell: Sell): Promise<Sell> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO sells (bookId, buyerName, price) VALUES(?,?,?)",
        [sell.bookId, sell.buyerName, sell.buyerName],
        (err, res) => {
          if (err) reject(err);
          else{

          }
        }
      );
    });
  }

}

export default new SellRepository();
