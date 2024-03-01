import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    selector: 'app-products-slider',
    standalone: true,
    imports: [FontAwesomeModule, HttpClientModule],
    providers: [ProductService],
    templateUrl: './products-slider.component.html',
    styleUrl: './products-slider.component.css',
})
export class ProductsSliderComponent implements OnInit {
    faChevronLeft = faChevronLeft;
    faChevronRight = faChevronRight;
    faStar = faStar;
    faStarHalfStroke = faStarHalfStroke;
    faHeart = faHeart;
    faCartShopping = faCartShopping;

    products: any[] = [];
    constructor(private service: ProductService) {}
    ngOnInit(): void {
        this.getProducts();
    }

    @ViewChild('cards') cardsContainer!: ElementRef;

    getProducts() {
        this.service.getAllProducts().subscribe({
            next: (p: any) => {
                console.log(p);
                this.products = p.data;
                console.log(this.products);
            },
            error: (e) => {
                console.log(e);
            },
        });
    }

    handleScrollNext(): void {
        const cards = this.cardsContainer.nativeElement as HTMLElement;
        cards.scrollLeft +=
            window.innerWidth / 2 > 600
                ? window.innerWidth / 2
                : window.innerWidth - 100;
    }
    handleScrollPrev(): void {
        const cards = this.cardsContainer.nativeElement as HTMLElement;
        cards.scrollLeft -=
            window.innerWidth / 2 > 600
                ? window.innerWidth / 2
                : window.innerWidth - 100;
    }
}
