import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { head } from 'lodash';
import { MENU_ITEMS } from '../../../main/constants';
import { AuthService } from '../../services/auth.service';
import { StorageKeys, StorageService, StorageType } from '../../services/storage.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    menu: MenuItem[] = [...MENU_ITEMS];

    selectedMenu: MenuItem;

    constructor(private _authService: AuthService, private _storageService: StorageService) {
        this.selectedMenu = head(this.menu);
    }

    ngOnInit(): void {
        this._storageService.set(StorageKeys.Selected_Page, this.selectedMenu.label, StorageType.Local);
    }

    pageChanged(item: MenuItem) {
        this._storageService.set(StorageKeys.Selected_Page, item.label, StorageType.Local);
    }
}
