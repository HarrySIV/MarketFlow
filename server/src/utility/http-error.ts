export class HttpError extends Error {
  constructor(message: string, errorCode: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
