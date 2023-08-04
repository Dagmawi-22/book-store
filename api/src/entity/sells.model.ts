import { RowDataPacket } from "mysql2"

export default interface Sell extends RowDataPacket {
  id? : number,
  bookId?: string;
  buyerName?: string;
  price? : DoubleRange
}
