import {User} from '../../models/user.model';

const actionsPrefix = '[Auth]';

export class Login {
  public static readonly type = `${actionsPrefix} Login`;
}

export class LoginSuccess {
  public static readonly type = `${actionsPrefix} Login Success`;
  constructor(public user: User) {
  }
}

export class LoginError {
  public static readonly type = `${actionsPrefix} Login Error`;
  constructor(public error: string) {
  }
}

export class Logout {
  public static readonly type = `${actionsPrefix} Logout`;
}
