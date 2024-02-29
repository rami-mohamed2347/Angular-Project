import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyResetRoutingModule } from './verify-reset-routing.module';
import { VerifyResetComponent } from './verify-reset.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        CommonModule,
        VerifyResetRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ToastModule,
        MessagesModule,
    ],
    declarations: [VerifyResetComponent],
})
export class VerifyResetModule {}
