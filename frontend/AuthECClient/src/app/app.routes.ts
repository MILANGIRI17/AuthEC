import { Routes } from '@angular/router';
import { User } from './user/user';
import { Registration } from './user/registration/registration';
import { Login } from './user/login/login';
import { Dashboard } from './user/dashboard/dashboard';

export const routes: Routes =
[
    { 
        path:'',
        component: User,
        title: 'Home Page',
        children:
        [
            {
                path:'',
                title: 'Login',
                component: Login
            },
            {
                path:'signup',
                title: 'Signup',
                component: Registration
            },
            {
                path: 'singin',
                title: 'Signin',
                component: Login
            }
        ]
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        component: Dashboard
    }
];
