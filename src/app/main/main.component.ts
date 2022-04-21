import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { find } from 'lodash';
import { STUDENT_MENU_ITEMS, SUPER_ADMIN_MENU_ITEMS } from './constants';
import { DestroyService } from '../common/services/destroy.service';
import {
    StorageKeys,
    StorageService,
    StorageType,
} from '../common/services/storage.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    providers: [DestroyService],
})
export class MainComponent implements OnInit {
    menu: MenuItem[] = [...SUPER_ADMIN_MENU_ITEMS, ...STUDENT_MENU_ITEMS];

    constructor(
        private _router: Router,
        private _destroy$: DestroyService,
        private _storageService: StorageService
    ) {
        this._router.events
            .pipe(takeUntil(this._destroy$))
            .subscribe((event: RouterEvent) => {
                if (!event.url) {
                    return;
                }
                const menuItem: MenuItem = find(this.menu, {
                    routerLink: [event.url.split('/')[2]],
                });
                if (!menuItem) {
                    return;
                }
                this._storageService.set(
                    StorageKeys.Selected_Page,
                    menuItem.label,
                    StorageType.Local
                );
            });
    }

    ngOnInit(): void {
        if (
            this._router.url.indexOf('login') !== -1 ||
            this._router.url === '/main'
        ) {
            this._router.navigate(['main/dashboard']);
        }
    }
}
