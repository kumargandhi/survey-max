import { Component, OnInit } from '@angular/core';
import {
    StorageKeys,
    StorageService,
    StorageType,
} from '../../services/storage.service';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    infoDialog = false;

    user: IUser;

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

    onInfoClick() {
        this.infoDialog = true;
    }
}
