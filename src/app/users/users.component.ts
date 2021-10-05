import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import * as _ from 'lodash';
import { IUser } from '../common/user.interface';
import { DestroyService } from '../service/destroy.service';
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

    openNew() {}

    deleteSelectedUsers() {}

    editUser(user: IUser) {}

    deleteUser(user: IUser) {}
}
