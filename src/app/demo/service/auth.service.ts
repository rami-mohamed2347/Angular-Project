import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedIn: boolean = false;
    private isAdmin: boolean = false;
    private apiUrl = 'https://admin-dashboard-mfhn.onrender.com/api/v1/auth';

    constructor(private http: HttpClient) {}

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials, {
            withCredentials: true,
        });
    }
    signup(credentials: {
        name: string;
        email: string;
        password: string;
        passwordConfirm: string;
    }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/signup`, credentials, {
            withCredentials: true,
        });
    }

    loginAdmin(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this.http
            .post<any>(`${this.apiUrl}/admin`, credentials, {
                withCredentials: true,
            })
            .pipe(
                tap(() => {
                    this.loggedIn = true; // Update isLoggedIn state upon successful login
                })
            );
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    verifyCode(code: { resetCode: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/verifySignup`, code, {
            withCredentials: true,
        });
    }

    forgotPassword(credentials: { email: string }): Observable<any> {
        return this.http.post<any>(
            `${this.apiUrl}/forgetPassword`,
            credentials,
            {
                withCredentials: true,
            }
        );
    }

    verifyResetCode(code: { resetCode: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/verifyResetCode`, code, {
            withCredentials: true,
        });
    }
    resetPassword(credentials: {
        password: string;
        passwordConfirm: string;
    }): Observable<any> {
        return this.http.patch<any>(
            `${this.apiUrl}/resetPassword`,
            credentials,
            {
                withCredentials: true,
            }
        );
    }

    logout(): Observable<any> {
        return this.http
            .get<any>(`${this.apiUrl}/logout`, {
                withCredentials: true,
            })
            .pipe(
                tap(() => {
                    this.loggedIn = false; // Update isLoggedIn state upon logout
                })
            );
    }
}
