import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
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
export class ResetComponent {
    password: string;
    passwordConfirm: string;

    constructor(
        private builder: FormBuilder,
        private router: Router,
        private AuthService: AuthService,
        public layoutService: LayoutService,
        private messageService: MessageService
    ) {}

    resetform = this.builder.group({
        password: this.builder.control(
            '',
            Validators.compose([
                Validators.required,
                Validators.pattern(
                    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
                ),
            ])
        ),
        passwordConfirm: this.builder.control('', Validators.required),
    });

    resetPassword() {
        if (this.resetform.valid && this.password === this.passwordConfirm) {
            console.log(this.resetform.value);

            this.AuthService.resetPassword({
                password: this.password,
                passwordConfirm: this.passwordConfirm,
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
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please enter valid data',
                life: 3000,
            });
        }
    }
}
