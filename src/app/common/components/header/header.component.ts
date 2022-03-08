import { Component, OnInit } from '@angular/core';
import {
    StorageKeys,
    StorageService,
    StorageType,
} from '../../services/storage.service';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

enum UserActions {
    Profile = 'Profile',
    Delete_Account = 'Delete_Account',
    Logout = 'Logout',
    Info = 'Info'
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    infoDialog = false;

    user: IUser;

    readonly UserActions = UserActions;

    constructor(
        private _storageService: StorageService,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        const currentUser = this._storageService.get<IUser>(
            StorageKeys.User,
            StorageType.Local
        );
        this._userService.getUser(currentUser).then((doc) => {
            if (doc.exists) {
                this.user = doc.data() as IUser;
            }
        });
    }

    onUserAction(action: UserActions) {
        switch (action) {
            case UserActions.Logout: {
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
}
