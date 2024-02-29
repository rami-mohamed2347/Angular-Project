import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Emitters } from '../../emitters/emitter';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [FontAwesomeModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
    faHeart = faHeart;
    faUser = faUser;
    faCartShopping = faCartShopping;

    authenticated = false;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        Emitters.authEmitter.subscribe((auth: boolean) => {
            this.authenticated = auth;
        });

        console.log(this.authenticated);
    }

    logout(): void {
        this.http
            .get(
                'https://admin-dashboard-mfhn.onrender.com/api/v1/auth/logout',
                {
                    withCredentials: true,
                }
            )
            .subscribe(
                (res) => {
                    console.log(res);
                    console.log('logged out');

                    this.authenticated = false;
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
