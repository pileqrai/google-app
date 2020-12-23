import {Injectable} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Login, Logout} from '../store/auth/auth.actions';
import {Observable} from 'rxjs';
import {AuthState} from '../store/auth/auth.state';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Select(AuthState.getUser) user$: Observable<User>;
  @Select(AuthState.getError) error$: Observable<string>;

  constructor(private store: Store) {
  }

  login = (): Observable<any> => this.store.dispatch(new Login());

  logout = (): Observable<any> => this.store.dispatch(new Logout());
}
