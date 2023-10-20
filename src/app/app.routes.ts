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
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('src/app/tag-feed/tag-feed.routes').then((m) => m.tagFeedRoutes),
  },
  {
    path: 'articles/new',
    pathMatch: 'full',
    loadChildren: () =>
      import('src/app/create-article/create-article.routes').then(
        (m) => m.createArticleRoutes
      ),
  },
  {
    path: 'articles/:slug',
    loadChildren: () =>
      import('src/app/single-article-page/single-article-page.routes').then(
        (m) => m.singleArticlePageRoutes
      ),
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () =>
      import('src/app/edit-article/edit-article.routes').then(
        (m) => m.editArticleRoutes
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('src/app/settings/settings.routes').then((m) => m.settingRoutes),
  },
];
