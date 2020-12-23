import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolbarComponent} from './toolbar.component';
import {AuthService} from '../../serivces/auth.service';
import {of} from 'rxjs';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            user$: of(),
            logout: () => {
            },
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service on logout', () => {
    const logoutSpy = spyOn(TestBed.inject(AuthService), 'logout')
      .and.stub();

    component.logout();
    expect(logoutSpy).toHaveBeenCalled();
  });
});
