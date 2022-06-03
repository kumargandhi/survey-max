import { Component, OnInit } from '@angular/core';
import {
    StorageKeys,
    StorageService,
    StorageType,
} from '../../services/storage.service';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { DestroyService } from '../../services/destroy.service';
import { Store } from '@ngrx/store';
import { selectUserMgmt } from '../../state/selectors/app.selectors';
import { takeUntil } from 'rxjs/operators';
import { getUser } from '../../state/actions/user.action';

enum UserActions {
    Profile = 'Profile',
    Delete_Account = 'Delete_Account',
    Logout = 'Logout',
    Info = 'Info',
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [DestroyService, ConfirmationService],
})
export class HeaderComponent implements OnInit {
    infoDialog = false;

    user: IUser;

    readonly UserActions = UserActions;

    confirmationMessage = '';

    showProfilePanel = false;

    readonly userMgmtUser$ = this.store.select(selectUserMgmt);

    constructor(
        private _storageService: StorageService,
        private _authService: AuthService,
        private _userService: UserService,
        private _confirmationService: ConfirmationService,
        private _destroy$: DestroyService,
        public store: Store
    ) {}

    ngOnInit(): void {
        // Dispatch action to get the user
        this.store.dispatch(getUser());

        this.userMgmtUser$.pipe(takeUntil(this._destroy$)).subscribe((data) => {
            if (data) {
                this.user = this._userService.currentUser = data.user;
            }
        });
    }

    onUserAction(action: UserActions) {
        switch (action) {
            case UserActions.Profile: {
                this.showProfilePanel = true;
                break;
            }
            case UserActions.Delete_Account: {
                this.confirmationMessage = `Are you sure that you want to delete your account?`;
                this._confirmationService.confirm({
                    message: this.confirmationMessage,
                    accept: () => {
                        this._authService.deleteUserAccount();
                    },
                });
                break;
            }
            case UserActions.Logout: {
                this._authService.signOut();
                break;
            }
            case UserActions.Info: {
                this.infoDialog = true;
                break;
            }
            default:
                break;
        }
    }

    getHeaderTitle() {
        return this._storageService.get<IUser>(
            StorageKeys.Selected_Page,
            StorageType.Local
        );
    }
}
