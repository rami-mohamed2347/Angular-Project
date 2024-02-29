import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class ForgotComponent {
    email: string;

    constructor(
        private router: Router,
        private AuthService: AuthService,
        public layoutService: LayoutService,
        private messageService: MessageService
    ) {}

    forgotSend() {
        this.AuthService.forgotPassword({
            email: this.email,
        }).subscribe(
            () => {
                this.router.navigate(['/auth/verifypass']);
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.error.message,
                    life: 3000,
                });

                console.log(error);
            }
        );
    }
}
