import {
    AfterViewInit,
    Directive,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
    Input,
    OnInit,
    OnDestroy,
} from '@angular/core';
import * as _ from 'lodash';
import { UserService } from '../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../services/destroy.service';
import { IUser } from '../interfaces/user.interface';
import { hasPermission } from '../helpers/common';

/**
 * Use this directive to show/hide content in template based on roles
 * For example: Adding *userAccess="['CU']" on an element will only render the element if a customer is logged in
 */
@Directive({
    selector: '[userAccess]',
})
export class UserAccessDirective implements OnInit, OnDestroy, AfterViewInit {
    _userAccess: string[];

    _isStrictCheck = false;

    _user: IUser;

    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private _destroy$: DestroyService,
        private _userService: UserService
    ) {}

    ngOnInit() {
        this._userService.currentUser$
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._user = this._userService.getCurrentUser();
                this.toggleDisplyElement();
            });
    }

    ngAfterViewInit() {
        if (!this._user) {
            return;
        }
        if (!this._user.roles) {
            return;
        }
        if (this._user.roles && this._user.roles.length > 0) {
            this.toggleDisplyElement();
        }
    }

    @Input('userAccess')
    set userAccess(val: string[]) {
        if (val) {
            this._userAccess = val;
            this.toggleDisplyElement();
        }
    }

    get userAccess() {
        return this._userAccess;
    }

    @Input('userAccessIsStrictCheck')
    set isStrictCheck(val: boolean) {
        this._isStrictCheck = val;
    }

    toggleDisplyElement() {
        if (!this.userAccess || !this._user) {
            return;
        }
        let hasAccess = false;
        const allowedAccess = this._userAccess;
        if (this._isStrictCheck) {
            if (
                _.isEqual(_.sortBy(allowedAccess), _.sortBy(this._user.roles))
            ) {
                hasAccess = true;
            }
        } else {
            for (let i = 0; i < allowedAccess.length; i++) {
                if (hasPermission(allowedAccess[i], this._user.roles)) {
                    hasAccess = true;
                    break;
                }
            }
        }
        if (!hasAccess) {
            this.viewContainer.clear();
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }

    ngOnDestroy() {}
}
