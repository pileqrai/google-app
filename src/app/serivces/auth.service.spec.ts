import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {NgxsModule, Store} from '@ngxs/store';
import {Login, Logout} from '../store/auth/auth.actions';

describe('AuthService', () => {
  let service: AuthService;
  let storeDispatchStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()]
    });
    service = TestBed.inject(AuthService);
    storeDispatchStub = spyOn(TestBed.inject(Store), 'dispatch').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dipatch login', () => {
    service.login();
    expect(storeDispatchStub).toHaveBeenCalledWith(new Login());
  });

  it('should dipatch logout', () => {
    service.logout();
    expect(storeDispatchStub).toHaveBeenCalledWith(new Logout());
  });
});
