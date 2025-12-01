


import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';


import { Signup } from './signup/signup';
import { CardContent } from './card-content/card-content';

import { Requests } from './requests/requests';
import { AdminPanel } from './admin-panel/admin-panel';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'content/:id', component: CardContent, canActivate: [AuthGuard] },
  { path: 'signup', component: Signup },
  { path: 'admin', component: AdminPanel, canActivate: [AuthGuard] },
  { path: 'requests', component: Requests, canActivate: [AuthGuard] },
];
