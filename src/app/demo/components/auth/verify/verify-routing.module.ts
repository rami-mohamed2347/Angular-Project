import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerifyComponent } from './verify.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: VerifyComponent }]),
    ],
    exports: [RouterModule],
})
export class VerifyRoutingModule {}
