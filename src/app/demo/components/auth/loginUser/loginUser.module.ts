import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserRoutingModule } from './loginUser-routing.module';
import { LoginUserComponent } from './loginUser.component';
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
        LoginUserRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ToastModule,
        MessagesModule,
    ],
    declarations: [LoginUserComponent],
})
export class LoginUserModule {}
