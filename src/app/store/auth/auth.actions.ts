const actionsPrefix = '[Auth]';

export class Login {
  public static readonly type = `${actionsPrefix} Login`;
}

export class LoginSuccess {
  public static readonly type = `${actionsPrefix} Login Success`;
}

export class Logout {
  public static readonly type = `${actionsPrefix} Logout`;
}
