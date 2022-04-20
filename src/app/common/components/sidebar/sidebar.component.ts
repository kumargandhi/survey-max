import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MenuItem } from 'primeng/api';
import { head } from 'lodash';
import { DEFAULT_MENU_ITEMS, STUDENT_MENU_ITEMS, SUPER_ADMIN_MENU_ITEMS } from '../../../main/constants';
import { AuthService } from '../../services/auth.service';
import {
    StorageKeys,
    StorageService,
    StorageType,
} from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { DestroyService } from '../../services/destroy.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [DestroyService]
})
export class SidebarComponent implements OnInit {
    menu: MenuItem[] = [...DEFAULT_MENU_ITEMS];

    selectedMenu: MenuItem;

    constructor(
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef,
        private _authService: AuthService,
        private _storageService: StorageService,
        private _userService: UserService
    ) {
        this.selectedMenu = head(this.menu);
        this._userService.currentUser$
          .pipe(takeUntil(this._destroy$))
          .subscribe(() => {
              if (this._userService.isCurrentUserStudent()) {
                  this.menu = [...STUDENT_MENU_ITEMS];
              } else {
                  this.menu = [...SUPER_ADMIN_MENU_ITEMS];
              }
              this._cd.markForCheck();
          });
    }

    ngOnInit(): void {
        this._storageService.set(
            StorageKeys.Selected_Page,
            this.selectedMenu.label,
            StorageType.Local
        );
    }

    pageChanged(item: MenuItem) {
        this._storageService.set(
            StorageKeys.Selected_Page,
            item.label,
            StorageType.Local
        );
        this._cd.markForCheck();
    }
}
