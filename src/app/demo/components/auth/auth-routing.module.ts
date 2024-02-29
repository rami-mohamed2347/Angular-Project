import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'error',
                loadChildren: () =>
                    import('./error/error.module').then((m) => m.ErrorModule),
            },
            {
                path: 'access',
                loadChildren: () =>
                    import('./access/access.module').then(
                        (m) => m.AccessModule
                    ),
            },
            {
                path: 'admin',
                loadChildren: () =>
                    import('./login/login.module').then((m) => m.LoginModule),
            },
            {
                path: 'user',
                loadChildren: () =>
                    import('./loginUser/loginUser.module').then(
                        (m) => m.LoginUserModule
                    ),
            },
            {
                path: 'register',
                loadChildren: () =>
                    import('./register/register.module').then(
                        (m) => m.RegisterModule
                    ),
            },
            {
                path: 'verify',
                loadChildren: () =>
                    import('./verify/verify.module').then(
                        (m) => m.VerifyModule
                    ),
            },
            {
                path: 'forgot',
                loadChildren: () =>
                    import('./forgot/forgot.module').then(
                        (m) => m.ForgotModule
                    ),
            },
            {
                path: 'reset',
                loadChildren: () =>
                    import('./reset/reset.module').then((m) => m.ResetModule),
            },
            {
                path: 'verifypass',
                loadChildren: () =>
                    import('./verify-reset/verify-reset.module').then(
                        (m) => m.VerifyResetModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
