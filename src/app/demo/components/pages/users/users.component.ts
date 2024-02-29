import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/demo/api/user';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/demo/service/user.service'; // Assuming UserService is your service for user operations
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './users.component.html',
    providers: [MessageService],
})
export class UsersComponent implements OnInit {
    userDialog: boolean = false;
    deleteUserDialog: boolean = false;
    deleteUsersDialog: boolean = false;
    users: User[] = [];
    user: User = {};
    selectedUsers: User[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    roles: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
        // private userService: UserService,
        private messageService: MessageService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.getUsers();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'email', header: 'Email' },
        ];

        this.statuses = [
            { label: true, value: true },
            { label: false, value: false },
        ];
        this.roles = [
            { label: 'user', value: 'user' },
            { label: 'manger', value: 'manger' },
        ];
    }

    getUsers() {
        this.http
            .get<any[]>(
                'https://admin-dashboard-mfhn.onrender.com/api/v1/users/',
                { withCredentials: true }
            )
            .subscribe(
                (data: any) => {
                    console.log(data.data.length);

                    this.users = data.data.map((item: any) => ({
                        id: item._id,
                        name: item.name,
                        email: item.email,
                        role: item.role,
                        status: item.active,
                    }));
                },
                (error) => {
                    console.error('Error fetching users:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to fetch users',
                        life: 3000,
                    });
                }
            );
        // this.userService.getUsers().subscribe(
        //     (data: User[]) => {
        //         this.users = data;
        //     },
        //     (error) => {
        //         console.error('Error fetching users:', error);
        //         this.messageService.add({
        //             severity: 'error',
        //             summary: 'Error',
        //             detail: 'Failed to fetch users',
        //             life: 3000,
        //         });
        //     }
        // );
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;

        // Collect ids of selected users to delete
        const idsToDelete = this.selectedUsers.map((user) => user.id);

        // Make DELETE request to delete selected users
        this.http
            .delete<any>(
                'https://admin-dashboard-mfhn.onrender.com/api/v1/users/delete',
                {
                    params: { ids: idsToDelete.join(',') },
                    withCredentials: true,
                }
            )
            .subscribe(
                () => {
                    // Filter out deleted users from local array
                    this.users = this.users.filter(
                        (val) => !idsToDelete.includes(val.id)
                    );
                    // Show success message
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'users Deleted',
                        life: 3000,
                    });
                    // Clear selected users array
                    this.selectedUsers = [];
                },
                (error) => {
                    // Show error message
                    console.error('Error deleting Users:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete Users',
                        life: 3000,
                    });
                }
            );
    }

    confirmDelete() {
        this.deleteUserDialog = false;

        // Make DELETE request to delete single user
        this.http
            .delete<any>(
                'https://admin-dashboard-mfhn.onrender.com/api/v1/users/' +
                    this.user.id,
                { withCredentials: true }
            )
            .subscribe(
                () => {
                    // Filter out deleted user from local array
                    this.users = this.users.filter(
                        (val) => val.id !== this.user.id
                    );
                    // Show success message
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'user Deleted',
                        life: 3000,
                    });
                    // Clear user object
                    this.user = {};
                },
                (error) => {
                    // Show error message
                    console.error('Error deleting user:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete user',
                        life: 3000,
                    });
                }
            );
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.user.name?.trim()) {
            const newUserData = {
                name: this.user.name,
                email: this.user.email,
                active: this.user.active,
                role: this.user.role,
            };
            console.log(newUserData);
            this.http
                .patch<any>(
                    'https://admin-dashboard-mfhn.onrender.com/api/v1/users/' +
                        this.user.id,
                    newUserData,
                    { withCredentials: true }
                )
                .subscribe(
                    () => {
                        this.getUsers();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'User Updated',
                            life: 3000,
                        });
                        this.userDialog = false;
                        this.user = {};
                    },
                    (error) => {
                        console.log(newUserData);
                        console.error('Error creating user:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to Update user',
                            life: 3000,
                        });
                    }
                );
        } else {
            console.error('User name is required.');
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'User name is required.',
                life: 3000,
            });
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
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
