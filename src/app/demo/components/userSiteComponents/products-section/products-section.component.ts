import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { HttpClientModule } from '@angular/common/http';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    selector: 'app-products-section',
    standalone: true,
    imports: [FontAwesomeModule, HttpClientModule],
    providers: [ProductService],
    templateUrl: './products-section.component.html',
    styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent implements OnInit {
    faHeart = faHeart;
    faEye = faEye;
    faStar = faStar;
    faStarHalfStroke = faStarHalfStroke;

    products: any[] = [];
    constructor(private service: ProductService) {}
    ngOnInit(): void {
        this.getProducts();
        this.getCategories();
    }
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

    categories: any[] = [];
    getCategories() {
        this.service.getAllCategories().subscribe({
            next: (c: any) => {
                console.log(c);
                this.categories = c.data;
            },
            error: (e) => {
                console.log(e);
            },
        });
    }

    getSelectedCateg(e: any) {
        console.log(e.target.value);
        const categ = e.target.value;
        // this.getProductsOfSelectedCategory(categ)
        if (categ == 'allProducts') {
            this.getProducts();
        } else {
            this.service.getProductsOfCategory(categ).subscribe({
                next: (response: any) => {
                    console.log(response);
                    this.products = response.data;
                },
                error: (e) => {
                    console.log(e);
                },
            });
        }
    }
}
