import * as dotenv from 'dotenv';
dotenv.config();
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
export const ENCRYPTION_IV = process.env.ENCRYPTION_IV;
module.exports = {
  ENCRYPTION_KEY,
  ENCRYPTION_IV,
};
