import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MENU_ITEMS } from '../../../main/constants';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    menu: MenuItem[] = [...MENU_ITEMS];

    constructor() {}

    ngOnInit(): void {}
}
