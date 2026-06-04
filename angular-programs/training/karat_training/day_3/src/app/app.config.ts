import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { counterReducer } from '../app/NgRx_Demo/counter/counter.reducer';
import { userReducer } from './NgRx_Demo/user/user.reducer';
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes), 
 provideStore({
      counter: counterReducer,
      user: userReducer
    })
],
};
