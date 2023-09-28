export class UserNotExists extends Error {
  constructor(email: string) {
    super(`User with ${email} not found`);
  }
}

export class UserExists extends Error {
  constructor(email: string) {
    super(`User with ${email} already exists`);
  }
}

export class UserHaveRole extends Error {
  constructor(email: string, role: string) {
    super(`User with ${email} already have role ${role}`);
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid Code");
  }
}

export class NoSuchRole extends Error {
  constructor() {
    super("There is no such role");
  }
}

export class UnAuthorizedError extends Error {
  constructor() {
    super("No auth token provided");
  }
}

export class IsNotAdmin extends Error {
  constructor() {
    super("You are not Admin, Dont have permisson");
  }
}

export class IsNotCustomer extends Error {
  constructor() {
    super("You are not Customer, you cant add to card");
  }
}

export class InvalidRefreshToken extends Error {
  constructor() {
    super("Refresh token is invalid");
  }
}

export class InvalidAccessToken extends Error {
  constructor() {
    super("Access Token token is invalid");
  }
}
