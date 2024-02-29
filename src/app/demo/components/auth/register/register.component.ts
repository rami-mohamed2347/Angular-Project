import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [MessageService],
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
export class RegisterComponent {
    name: string;
    email: string;
    password!: string;
    passwordConfirm!: string;

    constructor(
        private builder: FormBuilder,
        private router: Router,
        private AuthService: AuthService,
        public layoutService: LayoutService,
        private messageService: MessageService
    ) {}

    registerform = this.builder.group({
        name: this.builder.control('', Validators.required),
        email: this.builder.control(
            '',
            Validators.compose([Validators.required, Validators.email])
        ),
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


    signup() {
        if (this.registerform.valid && this.password === this.passwordConfirm) {
            console.log(this.registerform.value);

            this.AuthService.signup({
                name: this.name,
                email: this.email,
                password: this.password,
                passwordConfirm: this.passwordConfirm,
            }).subscribe(
                () => {
                    this.router.navigate(['/auth/verify']);
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error,
                        life: 3000,
                    });

                    console.log(error.message);
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
