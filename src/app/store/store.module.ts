import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {DEVTOOLS_REDUX_CONFIG, LOGGER_CONFIG, OPTIONS_CONFIG, STATES_MODULES} from './store.config';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {environment} from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG),
    environment.withStorage ? NgxsStoragePluginModule.forRoot() : [],
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
    NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
  ],
  exports: [NgxsModule]
})
export class NgxsStoreModule {}
