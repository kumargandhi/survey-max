import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { MENU_ITEMS } from './constants';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    items: MenuItem[] = [...MENU_ITEMS];

    constructor(private _router: Router) {}

    ngOnInit(): void {
        this._router.navigate(['main/dashboard']);
    }
}
