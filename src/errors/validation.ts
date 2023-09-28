export class InvalidBody extends Error {
  constructor(error: string) {
    super(`Body validation error: ${error}`);
  }
}
