/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as feedEffects from 'src/app/shared/components/feed/store/effects';
import * as authEffects from 'src/app/auth/store/effects';
import { authInterceptor } from './app/shared/interceptors/authInterceptor';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import {
  feedFeatureKey,
  feedReducer,
} from './app/shared/components/feed/store/reducers';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(authEffects, feedEffects),
  ],
});
