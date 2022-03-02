import { Component, OnInit } from '@angular/core';
import {
    StorageKeys,
    StorageService,
    StorageType,
} from '../../services/storage.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    infoDialog = false;

    user: IUser;

    constructor(private _storageService: StorageService) {}

    ngOnInit(): void {
        this.user = this._storageService.get<IUser>(
            StorageKeys.User,
            StorageType.Local
        );
    }

    onInfoClick() {
        this.infoDialog = true;
    }
}
