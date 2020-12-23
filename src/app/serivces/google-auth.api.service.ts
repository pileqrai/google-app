import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';

/* Code within below service was copy/pasted from https://jorgecf.github.io/2020/04/18/google-oauth-angular
and then modified */

/* istanbul ignore next */
@Injectable({
  providedIn: 'root'
})
export class GoogleAuthApiService {
  public gapiSetup = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;

  async authenticate(): Promise<User> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.signIn().then(user => this.mapGoogleUserToUser(user));
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({client_id: environment.google_api_client_id})
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  mapGoogleUserToUser(user: gapi.auth2.GoogleUser): User {
    const profile = user.getBasicProfile();

    return {
      email: profile.getEmail(),
      familyName: profile.getFamilyName(),
      givenName: profile.getGivenName(),
      id: profile.getId(),
      imageUrl: profile.getImageUrl(),
      name: profile.getName(),
    };
  }
}
