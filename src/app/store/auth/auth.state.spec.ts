import {Actions, NgxsModule, ofActionDispatched, Store} from '@ngxs/store';
import {TestBed} from '@angular/core/testing';
import {AUTH_STATE_KEY, AuthState} from './auth.state';
import {Login, LoginError, LoginSuccess, Logout} from './auth.actions';
import {GoogleAuthApiService} from '../../serivces/google-auth.api.service';
import {User} from '../../models/user.model';

describe('[TEST]: AuthStore', () => {
  let store: Store;
  let googleAuthApiService: GoogleAuthApiService;
  const fakeUser: User = {
    id: '1',
    givenName: 'Joe',
    familyName: 'Doe',
    email: 'john@doe.com',
    name: 'John Doe',
    imageUrl: 'some url',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState])],
      providers: [
        GoogleAuthApiService,
      ]
    });

    store = TestBed.inject(Store);
    googleAuthApiService = TestBed.inject(GoogleAuthApiService);
  });

  it('Should handle successful login action', async (done) => {
    spyOn(googleAuthApiService, 'authenticate').and.resolveTo(fakeUser);
    TestBed.inject(Actions).pipe(ofActionDispatched(LoginSuccess)).subscribe(({user}) => {
      const actual = store.selectSnapshot(AuthState);
      expect(actual).toEqual({
        user: fakeUser,
        error: null,
      });
      expect(user).toEqual(fakeUser);
      done();
    });
    await store.dispatch(new Login()).toPromise();
  });

  it('Should handle error during login action', async (done) => {
    spyOn(googleAuthApiService, 'authenticate').and.rejectWith({
      error: 'some error'
    });
    TestBed.inject(Actions).pipe(ofActionDispatched(LoginError)).subscribe(({error}) => {
      expect(error).toEqual('some error');
      const actual = store.selectSnapshot(AuthState);
      expect(actual).toEqual({
        user: null,
        error: 'some error',
      });
      done();
    });
    await store.dispatch(new Login()).toPromise();
  });

  it('Should handle unknown error during login action', async (done) => {
    spyOn(googleAuthApiService, 'authenticate').and.rejectWith('Something');
    TestBed.inject(Actions).pipe(ofActionDispatched(LoginError)).subscribe(({error}) => {
      expect(error).toEqual('Unhandled error');
      const actual = store.selectSnapshot(AuthState);
      expect(actual).toEqual({
        user: null,
        error: 'Unhandled error',
      });
      done();
    });
    await store.dispatch(new Login()).toPromise();
  });

  it('Should logout', (done) => {
    TestBed.inject(Actions).pipe(ofActionDispatched(Logout)).subscribe((_) => {
      const actual = store.selectSnapshot(AuthState);
      expect(actual).toEqual({});
      done();
    });
    store.dispatch(new Logout());
  });

  it('should select user', async () => {
    store.reset({
      [AUTH_STATE_KEY]: {
        user: fakeUser
      }
    });
    const user = store.selectSnapshot(AuthState.getUser);
    expect(user).toEqual(fakeUser);
  });

  it('should select error', async () => {
    store.reset({
      [AUTH_STATE_KEY]: {
        error: 'some error'
      }
    });
    const user = store.selectSnapshot(AuthState.getError);
    expect(user).toEqual('some error');
  });

});
