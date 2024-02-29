import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginUserComponent } from './loginUser.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: LoginUserComponent }]),
    ],
    exports: [RouterModule],
})
export class LoginUserRoutingModule {}
