declare namespace Express {
  interface Request {
    metadata?: {
      account?: {
        id: string;
        roleId: string;
      };
    };
  }
}
