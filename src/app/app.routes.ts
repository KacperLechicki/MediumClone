import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/global-feed/global-feed.routes').then(
        (m) => m.globalFeedRoutes
      ),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('src/app/your-feed/your-feed.routes').then(
        (m) => m.yourFeedRoutes
      ),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('src/app/tag-feed/tag-feed.routes').then((m) => m.tagFeedRoutes),
  },
];
