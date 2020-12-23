import {Component} from '@angular/core';
import {AuthService} from '../../serivces/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent {
  error$: Observable<string> = this.authService.error$;

  constructor(
    private authService: AuthService,
  ) {
  }

  login(): void {
    this.authService.login();
  }
}
