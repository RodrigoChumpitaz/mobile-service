export class UnexpectedError extends Error {
  constructor(err: any) {
    console.error(err);
    super(err);
  }
}