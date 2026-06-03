import { Routes } from '@angular/router';
import { User } from './user/user';
import { Registration } from './user/registration/registration';
import { Login } from './user/login/login';
import { Dashboard } from './user/dashboard/dashboard';
import { authGuard } from './shared/auth-guard';

export const routes: Routes =
    [
        {
            path: '', redirectTo: '/signin', pathMatch: 'full'
        },
        {
            path: '', title: 'Home Page', component: User,
            children:
                [
                    {
                        path: '', title: 'User', component: User
                    },
                    {
                        path: 'signup', title: 'Signup', component: Registration
                    },
                    {
                        path: 'signin', title: 'signin', component: Login
                    }
                ]
        },
        {
            path: 'dashboard', title: 'Dashboard', component: Dashboard, canActivate: [authGuard]
        }
    ];
