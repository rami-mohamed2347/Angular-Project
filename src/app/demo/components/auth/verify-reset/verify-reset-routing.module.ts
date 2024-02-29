import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerifyResetComponent } from './verify-reset.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: VerifyResetComponent }]),
    ],
    exports: [RouterModule],
})
export class VerifyResetRoutingModule {}
