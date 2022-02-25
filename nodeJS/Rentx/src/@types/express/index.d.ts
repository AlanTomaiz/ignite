/* eslint @typescript-eslint/naming-convention: "off" */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
