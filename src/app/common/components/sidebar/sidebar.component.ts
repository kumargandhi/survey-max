import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MENU_ITEMS } from '../../../main/constants';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    menu: MenuItem[] = [...MENU_ITEMS];

    constructor(private _authService: AuthService) {}

    ngOnInit(): void {}
}
