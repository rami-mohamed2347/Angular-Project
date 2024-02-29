import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private message: MessageService,
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true; // Allow access if user is logged in
        } else {
            console.log('user not logged in redirecting');

            this.router.navigate(['/auth/admin']);
            console.log('after redirection');
            setTimeout(() => {
                this.message.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Please Login',
                    life: 3000,
                }); // Display message after a short delay
            }, 500); // Adjust the delay as nee
            return false; // Deny access
        }
    }
}
