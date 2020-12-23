# GoogleApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.1.

## Development notes
1. Application by default doesn't persist store in local storage, this can be changed in environment file.
1. Google API communication code was copied from https://jorgecf.github.io/2020/04/18/google-oauth-angular with minor modifications - src/app/serivces/google-auth.api.service.ts - I've also decided to cut corner here and skip unit tests, setup and data mocking could take too much time.
1. Code has unit-test coverage of 100% ;)
1. As said in requirements I've used Ngxs, which was a new library for me. I must admit it's interesting, compared to Ngrx. 
1. For initial Ngxs store stup I've used their schematics in Angular CLI. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Unit tests
Run `npm run test:coverage` to execute unit tests with coverage. 
