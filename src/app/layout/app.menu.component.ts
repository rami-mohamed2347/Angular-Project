import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Products',
                items: [
                    {
                        label: 'Products',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/pages/crud'],
                    },
                ],
            },
            {
                label: 'Users',
                items: [
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/pages/users'],
                    },
                ],
            },
            {
                label: 'Logout',
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-out',
                        command: () => this.logout(),
                    },
                ],
            },
        ];
    }

    logout() {
        this.http
            .get(
                'https://admin-dashboard-mfhn.onrender.com/api/v1/auth/logout',
                { withCredentials: true }
            )
            .subscribe(
                () => {
                    this.router.navigate(['/auth/admin']);

                    // Handle successful logout
                    console.log('Logout successful');
                    // Redirect or perform any other action upon successful logout
                },
                (error) => {
                    // Handle error
                    console.error('Logout failed:', error);
                    // Optionally, show error message to the user
                }
            );
    }
}
