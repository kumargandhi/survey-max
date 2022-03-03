import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import { IUser } from '../common/interfaces/user.interface';
import { DestroyService } from '../common/services/destroy.service';
import { UsersAdapter } from './users.adapter';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { ConfirmationService } from 'primeng/api';
import { UserService } from '../common/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService, ConfirmationService],
})
export class UsersComponent implements OnInit {
    loading = false;

    errorText = '';

    selectedUsers: IUser[];

    users: IUser[];

    user: IUser;

    userDialog = false;
    @ViewChild('addUpdateUserComponent')
    addUpdateUserComponent: AddUpdateUserComponent;
    confirmationMessage = '';

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _usersAdapter: UsersAdapter,
        private _userService: UserService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getTableSummary() {
        return `Total ${this.users ? this.users.length : 0} ${
            this.users && this.users.length > 1 ? 'Users' : 'User'
        }`;
    }

    getUsers() {
        this.loading = true;
        this.errorText = '';
        this._userService.getUsers().subscribe(
            (data) => {
                this.users = _.cloneDeep(
                    data.map((e) => {
                        const s: IUser = e.payload.doc.data() as IUser;
                        s.id = e.payload.doc.id;
                        return s;
                    })
                );
                this.loading = false;
                this._cd.markForCheck();
            },
            (error) => {
                this.errorText = error;
                this.loading = false;
                this._cd.markForCheck();
            }
        );
    }

    openUserDialog() {
        this.user = null;
        this.userDialog = true;
    }

    hideDialog() {
        this.userDialog = false;
    }

    saveUser() {
        this.loading = true;
        this.errorText = '';
        if (this.user) {
            const user = this.addUpdateUserComponent.getUser;
            delete user.password;
            this._userService
                .updateUser({
                    ...user,
                    id: this.user.id,
                })
                .then(() => {
                    this.loading = false;
                    this.user = null;
                    this.hideDialog();
                    this.getUsers();
                    this._cd.markForCheck();
                })
                .catch((error) => {
                    this.addUpdateUserComponent.errorText = error;
                    this.loading = false;
                    this._cd.markForCheck();
                });
        } else {
            this._userService
                .saveUser(this.addUpdateUserComponent.getUser)
                .then(() => {
                    this.loading = false;
                    this.hideDialog();
                    this.getUsers();
                    this._cd.markForCheck();
                })
                .catch((error) => {
                    this.addUpdateUserComponent.errorText = error;
                    this.loading = false;
                    this._cd.markForCheck();
                });
        }
    }

    deleteSelectedUsers() {}

    editUser(user: IUser) {
        this.user = _.cloneDeep(user);
        this.userDialog = true;
    }

    deleteUser(user: IUser) {
        this.confirmationMessage = `Are you sure that you want to delete <strong>${user.displayName}</strong> user?`;
        this.confirmationService.confirm({
            message: this.confirmationMessage,
            accept: () => {
                this.loading = true;
                this.errorText = '';
                this._userService
                    .deleteUser(user.id)
                    .then(() => {
                        this.loading = false;
                        this.getUsers();
                    })
                    .catch((error) => {
                        this.loading = false;
                        this.errorText = error;
                    });
            },
        });
    }
}
