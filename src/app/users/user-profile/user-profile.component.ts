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
import { ROLES } from '../../main/constants';
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

    profileForm: FormGroup;

    passwordForm: FormGroup;

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
        this.profileForm = this._fb.group({
            email: [
                { value: this._user?.email, disabled: this._user?.email },
                validateEmail(),
            ],
            displayName: [this._user?.displayName, Validators.required],
            roles: [this._user?.roles[0], Validators.required],
        });
        this.passwordForm = this._fb.group({
            oldPassword: [
                '',
                validatePassword(),
            ],
            newPassword: [
                '',
                validatePassword(),
            ],
        });
        if (!this._user) {
            this.profileForm.controls.roles.setValue(head(this.roles));
        }
    }

    formSubscribe() {
        this.profileForm.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((data) => this.onValueChanged(data));
        this.passwordForm.valueChanges
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

    set errorText(value) {
        this._errorText = value;
    }
}
