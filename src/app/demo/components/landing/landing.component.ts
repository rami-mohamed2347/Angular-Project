import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../userSiteComponents/header/header.component';
import { FeaturesComponent } from '../userSiteComponents/features/features.component';
import { FlashSaleSectionComponent } from '../userSiteComponents/flash-sale-section/flash-sale-section.component';
import { ProductsSectionComponent } from '../userSiteComponents/products-section/products-section.component';
import { NewArrivalSectionComponent } from '../userSiteComponents/new-arrival-section/new-arrival-section.component';
import { BestSellerSectionComponent } from '../userSiteComponents/best-seller-section/best-seller-section.component';
import { FooterComponent } from '../userSiteComponents/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../emitters/emitter';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [
        RouterOutlet,
        FontAwesomeModule,
        HeaderComponent,
        FeaturesComponent,
        FlashSaleSectionComponent,
        ProductsSectionComponent,
        NewArrivalSectionComponent,
        BestSellerSectionComponent,
        FooterComponent,
    ],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.http
            .get(
                'https://admin-dashboard-mfhn.onrender.com/api/v1/users/getMe',
                {
                    withCredentials: true,
                }
            )
            .subscribe(
                (res: any) => {
                    console.log(res);

                    Emitters.authEmitter.emit(true);
                },
                (err) => {
                    console.log(err);

                    Emitters.authEmitter.emit(false);
                }
            );
    }
}
