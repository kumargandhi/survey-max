import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import * as _ from 'lodash';
import { IUser, userIns } from "../common/interfaces/user.interface";
import { DestroyService } from '../common/services/destroy.service';
import { UsersAdapter } from './users.adapter';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class UsersComponent implements OnInit {
    loading = false;

    errorText = '';

    selectedUsers: IUser[];

    users: IUser[];

    user: IUser;

    userDialog = false;

    submitted = false;

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _usersAdapter: UsersAdapter
    ) {}

    ngOnInit(): void {
        this.fetchUsers();
    }

    fetchUsers() {
        this.loading = true;
        this.errorText = '';
        this._usersAdapter.getUsers().subscribe(
            (data) => {
                this.users = _.cloneDeep(data);
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

    openNew() {
        this.user = _.cloneDeep(userIns);
        this.submitted = false;
        this.userDialog = true;
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;
    }

    deleteSelectedUsers() {}

    editUser(user: IUser) {}

    deleteUser(user: IUser) {}
}
