declare namespace Express {
  interface Request {
    metadata?: {
      account?: {
        id: string | undefined;
        role: string | undefined;
      };
    };
  }
}
