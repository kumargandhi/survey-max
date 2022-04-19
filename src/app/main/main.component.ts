import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { SUPER_ADMIN_MENU_ITEMS } from './constants';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    menu: MenuItem[] = [...SUPER_ADMIN_MENU_ITEMS];

    constructor(private _router: Router) {}

    ngOnInit(): void {
        if (
            this._router.url.indexOf('login') !== -1 ||
            this._router.url === '/main'
        ) {
            this._router.navigate(['main/dashboard']);
        }
    }
}
