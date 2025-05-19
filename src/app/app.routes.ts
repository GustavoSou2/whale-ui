import { Routes } from '@angular/router';
import { modules } from './modules/nav/factory/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';

const defRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './modules/landing-page/factory/landing-page/landing-page.component'
      ).then((m) => m.LandingPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/nav/factory/nav/nav.component').then(
        (m) => m.NavComponent
      ),
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./modules/home/factory/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'projects',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./modules/projects/factory/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
      },
      {
        path: 'projects/detail/:id',
        canActivate: [AuthGuard],

        loadComponent: () =>
          import('./modules/projects/factory/detail/detail.component').then(
            (m) => m.DetailComponent
          ),
      },
      {
        path: 'clients',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./modules/clients/factory/clients/clients.component').then(
            (m) => m.ClientsComponent
          ),
      },
      {
        path: 'collaborator',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './modules/collaborator/factory/collaborator/collaborator.component'
          ).then((m) => m.CollaboratorComponent),
      },

      {
        path: 'roles',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./modules/roles/factory/roles/roles.component').then(
            (m) => m.RolesComponent
          ),
      },
      {
        path: 'status',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./modules/status/factory/status/status.component').then(
            (m) => m.StatusComponent
          ),
      },
      {
        path: 'action-plan/status',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './modules/status-action-plan/factory/status-action-plan/status-action-plan.component'
          ).then((m) => m.StatusActionPlanComponent),
      },

      {
        path: 'approval-flow',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './modules/approval-flow/factory/approval-flow/approval-flow.component'
          ).then((m) => m.ApprovalFlowComponent),
      },
      {
        path: 'approval-flow/:id',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './modules/approval-flow/factory/approval-flow/approval-flow.component'
          ).then((m) => m.ApprovalFlowComponent),
      },
      {
        path: 'action-plan',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './modules/action-plan/factory/action-plan/action-plan.component'
          ).then((m) => m.ActionPlanComponent),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/account/factory/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/account/factory/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'register/confirm-account',
    loadComponent: () =>
      import(
        './modules/account/factory/confirm-account/confirm-account.component'
      ).then((m) => m.ConfirmAccountComponent),
  },
  {
    path: 'register/confirm',
    loadComponent: () =>
      import('./modules/account/factory/confirm/confirm.component').then(
        (m) => m.ConfirmComponent
      ),
  },
  {
    path: 'collaborator/finalize',
    loadComponent: () =>
      import(
        './modules/account/factory/collaborator-finalize/collaborator-finalize.component'
      ).then((m) => m.CollaboratorFinalizeComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

const subdomain = window.location.hostname.split('.')[0];

export const routes =
  subdomain == 'www' || subdomain == 'localhost' ? defRoutes : appRoutes;
