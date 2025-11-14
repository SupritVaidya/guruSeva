


import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';


import { Signup } from './signup/signup';
import { CardContent } from './card-content/card-content';
import { AdminPanel } from './admin-panel/admin-panel';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'content/:id', component: CardContent },
  { path: 'signup', component: Signup },
  { path: 'admin', component: AdminPanel },
];
