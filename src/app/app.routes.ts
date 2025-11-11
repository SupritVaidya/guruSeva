

import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login'; // Add standalone: true

export const routes: Routes = [
	{ path: '', component: Login },
	{ path: 'dashboard', component: Dashboard },
];
