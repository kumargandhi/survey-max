import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild
} from '@angular/core';
import * as _ from 'lodash';
import { IUser, userIns } from '../common/interfaces/user.interface';
import { DestroyService } from '../common/services/destroy.service';
import { UsersAdapter } from './users.adapter';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { ConfirmationService } from "primeng/api";
import { ISurvey } from "../common/interfaces/survey.interface";

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

    submitted = false;

    userDialog = false;
    @ViewChild('addUpdateUserComponent')
    addUpdateUserComponent: AddUpdateUserComponent;
    confirmationMessage = '';

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _usersAdapter: UsersAdapter,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.fetchUsers();
    }

    getTableSummary() {
        return `Total ${this.users ? this.users.length : 0} ${
            this.users && this.users.length > 1 ? 'Users' : 'User'
        }`;
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
        this.loading = true;
        this.errorText = '';
        if (this.user) {

        }
    }

    deleteSelectedUsers() {}

    editUser(user: IUser) {}

    deleteUser(user: IUser) {
        this.confirmationMessage = `Are you sure that you want to delete <strong>${user.email}</strong> survey?`;
        this.confirmationService.confirm({
            message: this.confirmationMessage,
            accept: () => {
                this.loading = true;
                this.errorText = '';
//                this._surveyService
//                  .deleteSurvey(survey.id)
//                  .then(() => {
//                      this.loading = false;
//                      this.getSurveys();
//                  })
//                  .catch((error) => {
//                      this.loading = false;
//                      this.errorText = error;
//                  });
            },
        });
    }
}
