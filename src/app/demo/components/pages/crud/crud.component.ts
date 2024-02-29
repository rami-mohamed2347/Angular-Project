import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService],
})
export class CrudComponent implements OnInit {
    productDialog: boolean = false;
    editProductDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        // API request to fetch products
        this.getProducts();

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'status', header: 'Status' },
        ];

        this.statuses = [
            { label: 'in stock', value: 'in stock' },
            { label: 'out of stock', value: 'out of stock' },
        ];
    }

    getProducts() {
        this.http
            .get<any[]>(
                'https://admin-dashboard-mfhn.onrender.com/api/v1/products/',
                { withCredentials: true }
            )
            .subscribe(
                (data: any) => {
                    this.products = data.data.map((item: any) => ({
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        category: item.category,
                        rating: item.rating,
                        media: item.media,
                        quantity: item.quantity,
                        description: item.description,

                        status: item.stock,
                    }));
                },
                (error) => {
                    console.error('Error fetching products:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to fetch products',
                        life: 3000,
                    });
                }
            );
    }
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.editProductDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;

        // Collect ids of selected products to delete
        const idsToDelete = this.selectedProducts.map((product) => product.id);

        // Make DELETE request to delete selected products
        this.http
            .delete<any>(
                'https://admin-dashboard-mfhn.onrender.com/api/v1/products/delete',
                {
                    params: { ids: idsToDelete.join(',') },
                    withCredentials: true,
                }
            )
            .subscribe(
                () => {
                    // Filter out deleted products from local array
                    this.products = this.products.filter(
                        (val) => !idsToDelete.includes(val.id)
                    );
                    // Show success message
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Products Deleted',
                        life: 3000,
                    });
                    // Clear selected products array
                    this.selectedProducts = [];
                },
                (error) => {
                    // Show error message
                    console.error('Error deleting products:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete products',
                        life: 3000,
                    });
                }
            );
    }

    confirmDelete() {
        this.deleteProductDialog = false;

        // Make DELETE request to delete single product
        this.http
            .delete<any>(
                'https://admin-dashboard-mfhn.onrender.com/api/v1/products/' +
                    this.product.id,
                { withCredentials: true }
            )
            .subscribe(
                () => {
                    // Filter out deleted product from local array
                    this.products = this.products.filter(
                        (val) => val.id !== this.product.id
                    );
                    // Show success message
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Deleted',
                        life: 3000,
                    });
                    // Clear product object
                    this.product = {};
                },
                (error) => {
                    // Show error message
                    console.error('Error deleting product:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete product',
                        life: 3000,
                    });
                }
            );
    }

    hideDialog() {
        this.productDialog = false;
        this.editProductDialog = false;
        this.submitted = false;
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.product.media = file;
        console.log(file);
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            const formData = new FormData();
            formData.append('name', this.product.name);
            formData.append('color', this.product.color);
            formData.append('description', this.product.description);
            formData.append('stock', this.product.status.toString());
            formData.append('category', this.product.category.toString());
            formData.append('price', this.product.price.toString());
            formData.append('quantity', this.product.quantity.toString());
            formData.append('media', this.product.media);

            this.http
                .post<any>(
                    'https://admin-dashboard-mfhn.onrender.com/api/v1/products/',
                    formData,
                    { withCredentials: true }
                )
                .subscribe(
                    () => {
                        this.getProducts(); // Reload data after saving product
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Product Created',
                            life: 3000,
                        });
                        this.productDialog = false;
                        this.product = {};
                    },
                    (error) => {
                        console.error('Error creating product:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create product',
                            life: 3000,
                        });
                    }
                );
        } else {
            console.error('Product name is required.');
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product name is required.',
                life: 3000,
            });
        }
    }
    saveEditProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            const formData = new FormData();
            formData.append('name', this.product.name);
            formData.append('color', this.product.color);
            formData.append('description', this.product.description);
            formData.append('status', this.product.status.toString());
            formData.append('category', this.product.category.toString());
            formData.append('price', this.product.price.toString());
            formData.append('quantity', this.product.quantity.toString());
            formData.append('media', this.product.media);

            this.http
                .patch<any>(
                    'https://admin-dashboard-mfhn.onrender.com/api/v1/products/' +
                        this.product.id,
                    formData,
                    { withCredentials: true }
                )
                .subscribe(
                    () => {
                        this.getProducts(); // Reload data after saving product
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Product Updated',
                            life: 3000,
                        });
                        this.editProductDialog = false;
                        this.product = {};
                    },
                    (error) => {
                        console.error('Error creating product:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create product',
                            life: 3000,
                        });
                    }
                );
        } else {
            console.error('Product name is required.');
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product name is required.',
                life: 3000,
            });
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
