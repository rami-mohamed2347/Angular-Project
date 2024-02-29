import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { UserService } from './demo/service/user.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api'; // Import MessageService
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        BreadcrumbModule,
        BrowserModule,
        BrowserAnimationsModule,
        DialogModule,
        TableModule,
        MessagesModule,
        ToastModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService,
        CountryService,
        UserService,
        EventService,
        IconService,
        ProductService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
