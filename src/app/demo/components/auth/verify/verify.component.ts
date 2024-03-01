import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
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
export class VerifyComponent implements AfterViewInit {
    resetCode: string;

    constructor(
        private router: Router,
        private AuthService: AuthService,
        public layoutService: LayoutService,
        private messageService: MessageService
    ) {}

    ngAfterViewInit(): void {
        this.showalert();
    }

    showalert() {
        setTimeout(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: "We've Sent you an email with your verification code",
                life: 5000,
            });
        });
    }
    verify() {
        this.AuthService.verifyCode({
            resetCode: this.resetCode,
        }).subscribe(
            () => {
                this.router.navigate(['/auth/user']);
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
