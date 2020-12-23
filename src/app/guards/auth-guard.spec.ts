import {RouterTestingModule} from '@angular/router/testing';
import {TestBed} from '@angular/core/testing';
import {AuthGuard} from './auth-guard';
import {Observable, of} from 'rxjs';
import {AuthService} from '../serivces/auth.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../models/user.model';

describe('AuthGuard', () => {
  const fakeUser: User = {
    id: '1',
    givenName: 'Joe',
    familyName: 'Doe',
    email: 'john@doe.com',
    name: 'John Doe',
    imageUrl: 'some url',
  };

  let guard: AuthGuard;
  let authService: AuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            user$: of()
          }
        }
      ],
    }).compileComponents();
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should let in authorized user', (done) => {
    authService.user$ = of(fakeUser);
    const obs$ = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<boolean>;
    obs$.subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('should block without a user and redirect', (done) => {
    const routerNavigateSpy = spyOn(TestBed.inject(Router), 'navigate').and.stub();

    authService.user$ = of(null);
    const obs$ = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<boolean>;
    obs$.subscribe((result) => {
      expect(result).toEqual(false);
      expect(routerNavigateSpy).toHaveBeenCalledWith(['login']);
      done();
    });
  });
});
