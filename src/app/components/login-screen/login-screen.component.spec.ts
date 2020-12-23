import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginScreenComponent } from './login-screen.component';
import {AuthService} from '../../serivces/auth.service';
import {of} from 'rxjs';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginScreenComponent ],
      providers: [{
        provide: AuthService,
        useValue: {
          error$: of(),
          login: () => {},
        }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login', () => {
    const loginSpy = spyOn(TestBed.inject(AuthService), 'login').and.stub();
    component.login();
    expect(loginSpy).toHaveBeenCalled();
  });
});
