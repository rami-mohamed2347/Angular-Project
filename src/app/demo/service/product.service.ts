import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    getAllProducts() {
        return this.http.get(
            'https://admin-dashboard-mfhn.onrender.com/api/v1/products'
        );
    }
    getAllCategories() {
        return this.http.get(
            'https://admin-dashboard-mfhn.onrender.com/api/v1/categories'
        );
    }
    getProductsOfCategory(categ: string) {
        return this.http.get(
            `https://admin-dashboard-mfhn.onrender.com/api/v1/products/?category=${categ}`
        );
    }

    getProductsSmall() {
        return this.http
            .get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProducts() {
        return this.http
            .get<any>('assets/demo/data/products.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProductsMixed() {
        return this.http
            .get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProductsWithOrdersSmall() {
        return this.http
            .get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }
}
