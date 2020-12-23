import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {AuthService} from '../../serivces/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user$: Observable<User> = this.authService.user$;

  constructor(private authService: AuthService) { }
}
