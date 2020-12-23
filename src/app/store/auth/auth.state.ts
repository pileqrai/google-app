import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Login, Logout} from './auth.actions';
import {GoogleAuthApiService} from '../../serivces/google-auth.api.service';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {EMPTY, Observable} from 'rxjs';
import {Navigate} from '@ngxs/router-plugin';

export interface AuthStateModel {
  user?: User;
  error?: string;
}

export const AUTH_STATE_KEY = 'authState';

@State<AuthStateModel>({
  name: AUTH_STATE_KEY,
  defaults: {}
})
@Injectable()
export class AuthState {
  constructor(private gapiAuthService: GoogleAuthApiService) {
  }

  @Selector()
  static getError(state: AuthStateModel): string {
    return state.error;
  }

  @Selector()
  static getUser(state: AuthStateModel): User {
    return state.user;
  }

  @Action(Login)
  login({setState, getState, dispatch}: StateContext<AuthStateModel>): Observable<any> {
    setState({
      ...getState(),
      user: null,
      error: null,
    });
    return fromPromise(this.gapiAuthService.authenticate()).pipe(
      catchError(error => {
        setState({
          ...getState(),
          error: error.error,
        });
        return EMPTY;
      }),
      switchMap((user) => {
        setState({
          ...getState(),
          user,
        });
        return dispatch(new Navigate(['/profile']));
      })
    );
  }

  @Action(Logout)
  logout({setState, dispatch}: StateContext<AuthStateModel>): Observable<void> {
    setState({});
    return dispatch(new Navigate(['/login']));
  }
}
