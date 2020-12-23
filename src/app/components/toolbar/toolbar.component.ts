import {Component} from '@angular/core';
import {AuthService} from '../../serivces/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  user$: Observable<User> = this.authService.user$;

  constructor(private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
  }
}
