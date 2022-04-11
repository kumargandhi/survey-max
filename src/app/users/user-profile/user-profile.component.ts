import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { IUser } from '../../common/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { head } from 'lodash';
import { PASSWORD_DUMMY_TEXT, ROLES } from '../../main/constants';
import { DestroyService } from '../../common/services/destroy.service';
import { UserService } from '../../common/services/user.service';
import { validateEmail } from '../../common/validators/email.validator';
import { validatePassword } from '../../common/validators/password.validator';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class UserProfileComponent implements OnInit {
    _user: IUser;

    form: FormGroup;

    loading = false;

    _errorText = '';

    roles = Object.values(ROLES).map((item) => ({ id: item, label: item }));

    constructor(
        private _fb: FormBuilder,
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef,
        private _userSurvey: UserService
    ) {}

    @Input() set user(val) {
        this._user = val;
        if (!this._user) { return; }
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    ngOnInit(): void {
        if (!this._user) { return; }
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {
        this.form = this._fb.group({
            email: [
                { value: this._user?.email, disabled: this._user?.email },
                validateEmail(),
            ],
            password: [
                {
                    value: this._user ? PASSWORD_DUMMY_TEXT : '',
                    disabled: this._user,
                },
                validatePassword(),
            ],
            displayName: [this._user?.displayName, Validators.required],
            roles: [this._user?.roles[0], Validators.required],
        });
        if (!this._user) {
            this.form.controls.roles.setValue(head(this.roles));
        }
    }

    formSubscribe() {
        this.form.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((data) => this.onValueChanged(data));
    }

    onValueChanged(data?: any) {
        if (!data) {
            return;
        }
        this.loading = false;
        this.errorText = '';
    }

    get getUser(): IUser | null {
        if (!this.form.valid) {
            return null;
        }
        const { email, password, displayName, roles } = this.form.controls;
        return {
            email: email.value,
            password: password.value,
            displayName: displayName.value,
            roles: [roles.value],
        };
    }

    set errorText(value) {
        this._errorText = value;
    }
}
