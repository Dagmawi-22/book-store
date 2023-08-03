import { RowDataPacket } from "mysql2"

export default interface Book extends RowDataPacket {
  id? : BigInt,
  title?: string;
  description?: string;
  discount?: BigInteger;
  cover_image?: string;
  price? : DoubleRange
}
