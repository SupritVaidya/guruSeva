


import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { CardContent } from './card-content/card-content';

export const routes: Routes = [
	{ path: '', component: Login },
	{ path: 'dashboard', component: Dashboard },
	{ path: 'content/:id', component: CardContent },
];
