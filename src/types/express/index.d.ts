declare namespace Express {
  interface Request {
    user: { userId: String | undefined };
  }
}