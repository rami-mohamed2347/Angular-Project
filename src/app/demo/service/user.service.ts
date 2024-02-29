import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../api/user'; // Assuming the User interface is defined in 'user.ts'

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http
            .get<any>('assets/demo/data/users-small.json')
            .toPromise()
            .then((res) => res.data as User[])
            .then((data) => data);
    }

    getUsersMedium() {
        return this.http
            .get<any>('assets/demo/data/users-medium.json')
            .toPromise()
            .then((res) => res.data as User[])
            .then((data) => data);
    }

    getUsersLarge() {
        return this.http
            .get<any>('assets/demo/data/users-large.json')
            .toPromise()
            .then((res) => res.data as User[])
            .then((data) => data);
    }

    deleteUsers() {
        return this.http
            .get<any>('assets/demo/data/users-large.json')
            .toPromise()
            .then((res) => res.data as User[])
            .then((data) => data);
    }
}
